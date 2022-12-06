<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use File;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $task=DB::table('tasks')->get();

        return response()->json([
                'status'=>200,
                'task'=>$task
        ]);
    }

    public function frontendViewtask()
    {
        $job=DB::table('tasks')->where("status" , "=" , "enable")->get();

        return response()->json([
                'status'=>200,
                'tasks'=>$job
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function enable_status(Request $request,$id)
    {
        $task=DB::table('tasks')
        ->where('id', $id)
        ->update(['status' => 'enable']);
        if($task){
            return response()->json([
                'status'=>200,
                'message'=>'Task Enable Successfully'
        ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
            $task = new task;
            $task->company_legal_name=$request->input('company_legal_name');
            $task->company_popular_name=$request->input('company_popular_name');
            $task->company_url=$request->input('company_url');
            $task->about_company=$request->input('about_company');
            $task->call_action=$request->input('call_action');
            $task->call_action1=$request->input('call_action1');


            $task->task_title=$request->input('task_title');
            $task->price=$request->input('price');
            $task->per_download=$request->input('per_download');

            $task->expiry_date=$request->input('expiry_date');
            $task->total_openings=$request->input('total_openings');
            $task->steps=$request->input('steps');
            $task->term_condition=$request->input('term_condition');
            $task->add_rew=$request->input('add_rew');
            $task->ref_link=$request->input('ref_link');
            $task->ref_code=$request->input('ref_code');
            $task->status='enable';
            
           
            
                
        if($request->hasfile('company_logo')){
            $image=$request->file('company_logo');
            $ext=$image->extension();
            $image_name=time().'.'.$ext;
            $image->move(public_path('company'),$image_name);
            $task->company_logo=$image_name;
         }else{
            $task->company_logo=$request->input('company_logo'); 
        }

        
        $task->save();
            return response()->json([
                'status'=>200,
                'message'=>'task Details Inserted Successfully'
        ]);
        }

    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\task  $task
     * @return \Illuminate\Http\Response
     */
    public function disable_status(Request $request,$id)
    {
        $task=DB::table('tasks')
        ->where('id', $id)
        ->update(['status' => 'disable']);
        if($task){
            return response()->json([
                'status'=>200,
                'message'=>'Task Disable Successfully'
        ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $task = task::find($id);
        if($task){
        return response()->json([
            'status'=>200,
            'task'=>$task
            ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>' Task Id Not Found'
                    ]);
                
            }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
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
    
                    $task =  task::find($id);
                    if($task){
                        
            
                        $task->task_title=$request->input('task_title');
                        $task->price=$request->input('price');
                        $task->per_download=$request->input('per_download');
                        
                        $task->expiry_date=$request->input('expiry_date');
                        $task->total_openings=$request->input('total_openings');
                        $task->steps=$request->input('steps');
                        $task->term_condition=$request->input('term_condition');
                        $task->add_rew=$request->input('add_rew');
                        
                        $task->company_legal_name=$request->input('company_legal_name');
                        $task->company_popular_name=$request->input('company_popular_name');
                        $task->company_url=$request->input('company_url');
                        $task->about_company=$request->input('about_company');
                        $task->call_action=$request->input('call_action');
                        $task->call_action1=$request->input('call_action1');
            
                        $task->status='enable';
                        
                        $task->ref_link=$request->input('ref_link');
                        $task->ref_code=$request->input('ref_code');
                       
                       
                    
                        
                    if($request->hasfile('company_logo')){
                    $Image=DB::table('tasks')->where(['id'=>$id])->get();
                    $file=public_path('company/'.$Image[0]->company_logo);
                    if(File::exists($file)){
                        File::delete($file);
                    }
                    $image=$request->file('company_logo');
                    $ext=$image->extension();
                    $image_name=time().'.'.$ext;
                    $image->move(public_path('company'),$image_name);
                    $task->company_logo=$image_name;
                }else{
                    $task->company_logo=$request->input('company_logo'); 
                }
                
                $task->save();
                    return response()->json([
                        'status'=>200,
                        'message'=>'Task Details updated'

                ]);
                }else{
                    return response()->json([
                        'status'=>404,
                        'message'=>'Task Id  Not Found'
                ]);
            
        }
    }
   }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\task  $task
     * @return \Illuminate\Http\Response
     */
    public function delete_task(Request $request,$id)
    {
        //
        $task=DB::table('tasks')
        ->where('id', $id)
        ->delete();
        if($task){
            return response()->json([
                'status'=>204,
                'message'=>'Task Disable Successfully'
        ]);
        }
    }
}
