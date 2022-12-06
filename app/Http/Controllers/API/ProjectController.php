<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Storage;
use File;

class ProjectController extends Controller
{
    public function index()
    {
      
        $projects=DB::table('projects')->get();

        return response()->json([
                'status'=>200,
                'projects'=>$projects
        ]);

    }

    public function frontendViewproject()
    {
        $job=DB::table('projects')->where("status" , "=" , "enable")->get();

        return response()->json([
                'status'=>200,
                'projects'=>$job
        ]);
    }

    public function edit($id){
        $projects = Project::find($id);
        if($projects){
        return response()->json([
            'status'=>200,
            'projects'=>$projects
            ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>' Job Id Not Found'
                    ]);
                
            }
    }
    public function store(Request $request)
    {
        $validater = Validator::make($request->all(),[
            'company_legal_name'=>'required|max:19',
            'company_popular_name'=>'required|max:191',
            'company_url'=>'required|max:191',
            
            'about_company'=>'required|max:191',
            'call_action'=>'required|max:191'
        ]);

        if($validater->fails())
        {
                return response()->json([
                        'validation_errors'=>$validater->messages()
                ]);
        }else{
            $Project = new Project;
            $Project->company_legal_name=$request->input('company_legal_name');
            $Project->company_popular_name=$request->input('company_popular_name');
            $Project->company_url=$request->input('company_url');
            $Project->about_company=$request->input('about_company');
            $Project->call_action=$request->input('call_action');
            $Project->call_action1=$request->input('call_action1');


            $Project->project_title=$request->input('project_title');
            $Project->sub_title=$request->input('sub_title');
            $Project->project_type=$request->input('project_type');
            
            $Project->expiry_date=$request->input('expiry_date');
            $Project->total_openings=$request->input('total_openings');
            $Project->amt=$request->input('amt');
            $Project->state=$request->input('state');
            $Project->city=$request->input('city');
            $Project->area=$request->input('area');
            $Project->task=$request->input('task');
            $Project->term_condition=$request->input('term_condition');
            $Project->add_rewa=$request->input('add_rewa');
            $Project->status='enable';
            $Project->mini_edu_req=$request->input('mini_edu_req');
            $Project->experience_req=$request->input('experience_req');
            $Project->skill_req=$request->input('skill_req');
            $Project->doc_req=$request->input('doc_req');
            $Project->add_req=$request->input('add_req');
           
           
            
                
        if($request->hasfile('company_logo')){
            $image=$request->file('company_logo');
            $ext=$image->extension();
            $image_name=time().'.'.$ext;
            $image->move(public_path('company'),$image_name);
            $Project->company_logo=$image_name;
         }else{
            $Project->company_logo=$request->input('company_logo'); 
        }

        if($request->hasfile('descri_video')){
            $video=$request->file('descri_video');
            $ext=$video->extension();
            $video_name=time().'.'.$ext;
            $video->move(public_path('video'),$video_name);
            $Project->descri_video=$video_name;
        }
        $Project->save();
            return response()->json([
                'status'=>200,
                'message'=>'Project Details Inserted Successfully'
        ]);
        }

    }

    public function update(Request $request, $id)
    {    $validater = Validator::make($request->all(),[
        'company_legal_name'=>'required|max:19',
        'company_popular_name'=>'required|max:191',

        'company_url'=>'required|max:191',
        'about_company'=>'required|max:191',
        'call_action'=>'required|max:191'
        ]);

        if($validater->fails())
        {
                return response()->json([
                        'status'=>422,
                        'validation_errors'=>$validater->messages(),
                ]);
        }else{
    
                    $Project =  Project::find($id);
                    if($Project){
                        $Project->company_legal_name=$request->input('company_legal_name');
                        $Project->company_popular_name=$request->input('company_popular_name');
                        $Project->company_url=$request->input('company_url');
                        $Project->about_company=$request->input('about_company');
                        $Project->call_action=$request->input('call_action');
                        $Project->call_action1=$request->input('call_action1');


                        $Project->project_title=$request->input('project_title');
                        $Project->sub_title=$request->input('sub_title');
                        $Project->project_type=$request->input('project_type');
                        
                        $Project->expiry_date=$request->input('expiry_date');
                        $Project->total_openings=$request->input('total_openings');
                        $Project->amt=$request->input('amt');
                        $Project->state=$request->input('state');
                        $Project->city=$request->input('city');
                        $Project->area=$request->input('area');
                        $Project->task=$request->input('task');
                        $Project->term_condition=$request->input('term_condition');
                        $Project->add_rewa=$request->input('add_rewa');
                        $Project->status='enable';
                        $Project->mini_edu_req=$request->input('mini_edu_req');
                        $Project->experience_req=$request->input('experience_req');
                        $Project->skill_req=$request->input('skill_req');
                        $Project->doc_req=$request->input('doc_req');
                        $Project->add_req=$request->input('add_req');
           
           
                    
                        
                    if($request->hasfile('company_logo')){
                    $Image=DB::table('projects')->where(['id'=>$id])->get();
                    $file=public_path('company/'.$Image[0]->company_logo);
                    if(File::exists($file)){
                        File::delete($file);
                    }
                    $image=$request->file('company_logo');
                    $ext=$image->extension();
                    $image_name=time().'.'.$ext;
                    $image->move(public_path('company'),$image_name);
                    $Project->company_logo=$image_name;
                }else{
                    $Project->company_logo=$request->input('company_logo'); 
                }
                if($request->hasfile('descri_video')){
                    $Image=DB::table('jobs')->where(['id'=>$id])->get();
                    $file=public_path('video/'.$Image[0]->descri_video);
                    if(File::exists($file)){
                        File::delete($file);
                    }
                    $video=$request->file('descri_video');
                    $ext=$video->extension();
                    $video_name=time().'.'.$ext;
                    $video->move(public_path('video'),$video_name);
                    $Project->descri_video=$video_name;
                }

                $Project->save();
                    return response()->json([
                        'status'=>200,
                        'message'=>'projects Details updated'

                ]);
                }else{
                    return response()->json([
                        'status'=>404,
                        'message'=>'projects Id  Not Found'
                ]);
            
        }
    }
   }   

    public function delete(Request $request, $id)
    {
        # code...
        $Project = Project::find($id);
        
        
        $Project->delete();
        return response()->json([
            'status'=>204,
            'message'=>'projects Details  Deleted'
        ]);
        

    }
    
    public function disable_status(Request $request, $id)
    {
        # code..
           $update= DB::table('projects')
        ->where('id', $id)
        ->update([
            'status'     => 'disable'
        ]);
        if($update){
            return response()->json([
                'status'=>200,
                'message'=>'projects status disable'
            ]);
        }
        
        
        

    }
    public function enable_status(Request $request, $id)
    {
        # code..
           $update= DB::table('projects')
        ->where('id', $id)
        ->update([
            'status'     => 'enable'
        ]);
        if($update){
            return response()->json([
                'status'=>200,
                'message'=>'projects status enable'
            ]);
        }
        
        
        

    }
    
}
