<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Storage;
use File;

class JobsController extends Controller
{
    public function index()
    {
        # code...
        $job=DB::table('jobs')->get();

        return response()->json([
                'status'=>200,
                'job'=>$job
        ]);

    }

    public function frontendJobview()
    {
        $job=DB::table('jobs')->where("status" , "=" , "enable")->get();

        return response()->json([
                'status'=>200,
                'job'=>$job
        ]);

    }

    public function frontendCategory()
    {
        $job=DB::table('categories')->where("cat_name" , "=" , "Food Delivery Job")->get();

        return response()->json([
                'status'=>200,
                'job'=>$job
        ]);

    }
    public function frontendJobfilter()
    {
        $job=DB::table('jobs')->where("job_type" , "=" , "Part Time")->get();

        return response()->json([
                'status'=>200,
                'job'=>$job
        ]);

    }

    public function frontendJobshortby()
    {
        $job=DB::table('jobs')->orderBy('salary_min', 'desc')->get();

        return response()->json([
                'status'=>200,
                'job'=>$job
        ]);
    }

    public function frontendLocation()
    {
        $job=DB::table('jobs')->where('state', 'delhi')->get();

        return response()->json([
                'status'=>200,
                'job'=>$job
        ]);
    }

    public function frontendPricerange()
    {
        $job=DB::table('jobs')->where('state', 'delhi')->get();

        return response()->json([
                'status'=>200,
                'job'=>$job
        ]);
    }

    public function edit($id){
        $job = Job::find($id);
        if($job){
        return response()->json([
            'status'=>200,
            'job'=>$job
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
            $Job = new Job;
            $Job->company_legal_name=$request->input('company_legal_name');
            $Job->company_popular_name=$request->input('company_popular_name');
            $Job->company_url=$request->input('company_url');
            $Job->about_company=$request->input('about_company');
            $Job->call_action=$request->input('call_action');
            $Job->call_action1=$request->input('call_action1');


            $Job->job_title=$request->input('job_title');
            $Job->sub_title=$request->input('sub_title');
            $Job->job_type=$request->input('job_type');
            $Job->job_category=$request->input('job_category');

            $Job->expiry_date=$request->input('expiry_date');
            $Job->total_openings=$request->input('total_openings');
            $Job->salary_min=$request->input('salary_min');
            $Job->salary_max=$request->input('salary_max');
            $Job->state=$request->input('state');
            $Job->city=$request->input('city');
            $Job->area=$request->input('area');
            $Job->roles_responsibilities=$request->input('roles_responsibilities');
            $Job->status='enable';
            $Job->mini_edu_req=$request->input('mini_edu_req');
            $Job->year_req=$request->input('year_req');
            $Job->month_req=$request->input('month_req');
            $Job->skill_req=$request->input('skill_req');
            $Job->doc_req=$request->input('doc_req');
            $Job->add_req=$request->input('add_req');
           
           
            
                
        if($request->hasfile('company_logo')){
            $image=$request->file('company_logo');
            $ext=$image->extension();
            $image_name=time().'.'.$ext;
            $image->move(public_path('company'),$image_name);
            $Job->company_logo=$image_name;
         }else{
            $Job->company_logo=$request->input('company_logo'); 
        }

        if($request->hasfile('descri_video')){
            $video=$request->file('descri_video');
            $ext=$video->extension();
            $video_name=time().'.'.$ext;
            $video->move(public_path('video'),$video_name);
            $Job->descri_video=$video_name;
        }
        $Job->save();
            return response()->json([
                'status'=>200,
                'message'=>'Job Details Inserted Successfully'
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
    
                    $Job =  Job::find($id);
                    if($Job){
                        $Job->company_legal_name=$request->input('company_legal_name');
                        $Job->company_popular_name=$request->input('company_popular_name');
                        $Job->company_url=$request->input('company_url');
                        $Job->about_company=$request->input('about_company');
                        $Job->call_action=$request->input('call_action');
                        $Job->call_action1=$request->input('call_action1');
            
            
                        $Job->job_title=$request->input('job_title');
                        $Job->sub_title=$request->input('sub_title');
                        $Job->job_type=$request->input('job_type');
                        $Job->job_category=$request->input('job_category');
            
                        $Job->expiry_date=$request->input('expiry_date');
                        $Job->total_openings=$request->input('total_openings');
                        $Job->salary_min=$request->input('salary_min');
                        $Job->salary_max=$request->input('salary_max');
                        $Job->state=$request->input('state');
                        $Job->city=$request->input('city');
                        $Job->area=$request->input('area');
                        $Job->roles_responsibilities=$request->input('roles_responsibilities');
                        $Job->status='enable';
                        $Job->mini_edu_req=$request->input('mini_edu_req');
                        $Job->year_req=$request->input('year_req');
                        $Job->month_req=$request->input('month_req');
                        $Job->skill_req=$request->input('skill_req');
                        $Job->doc_req=$request->input('doc_req');
                        $Job->add_req=$request->input('add_req');
                       
                       
                    
                        
                    if($request->hasfile('company_logo')){
                    $Image=DB::table('jobs')->where(['id'=>$id])->get();
                    $file=public_path('company/'.$Image[0]->company_logo);
                    if(File::exists($file)){
                        File::delete($file);
                    }
                    $image=$request->file('company_logo');
                    $ext=$image->extension();
                    $image_name=time().'.'.$ext;
                    $image->move(public_path('company'),$image_name);
                    $Job->company_logo=$image_name;
                }else{
                    $Job->company_logo=$request->input('company_logo'); 
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
                    $Job->descri_video=$video_name;
                }

                $Job->save();
                    return response()->json([
                        'status'=>200,
                        'message'=>'Job Details updated'

                ]);
                }else{
                    return response()->json([
                        'status'=>404,
                        'message'=>'Job Id  Not Found'
                ]);
            
        }
    }
   }   

    public function delete(Request $request, $id)
    {
        # code...
        $Job = Job::find($id);
        
        
        $Job->delete();
        return response()->json([
            'status'=>204,
            'message'=>'Job Details  Deleted'
        ]);
        

    }
    
    public function disable_status(Request $request, $id)
    {
        # code..
           $update= DB::table('jobs')
        ->where('id', $id)
        ->update([
            'status'     => 'disable'
        ]);
        if($update){
            return response()->json([
                'status'=>200,
                'message'=>'jobs status disable'
            ]);
        }
        
        
        

    }
    public function enable_status(Request $request, $id)
    {
        # code..
           $update= DB::table('jobs')
        ->where('id', $id)
        ->update([
            'status'     => 'enable'
        ]);
        if($update){
            return response()->json([
                'status'=>200,
                'message'=>'jobs status enable'
            ]);
        }
    }
    
}
