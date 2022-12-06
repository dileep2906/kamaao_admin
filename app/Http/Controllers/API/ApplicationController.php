<?php

namespace App\Http\Controllers\API;

use Storage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Response,File;

class ApplicationController extends Controller
{
    public function application_view(Request $request ,$id)
    {
        $assign=$request->assign;

        $assign=DB::table('personal_access_tokens')->where('name' , $id)->first();

        // print_r(localStorage.getItem('isUserLogged'));
        // dd($assign->tokenable_id);
        // die();
        
        if($assign->tokenable_id != 1){
        $application = DB::table('job_application')
            ->join('user_regisrtration','job_application.user_id','=','user_regisrtration.id')
            ->join('jobs','job_application.job_id','=','jobs.id')
            ->select('job_application.*','user_regisrtration.profile_pic','user_regisrtration.name',
                'user_regisrtration.gender','user_regisrtration.mobile','jobs.state','jobs.city',
                'jobs.area','jobs.company_legal_name')
                ->where('job_application.assign',$assign->tokenable_id)->orderby('id','desc')->get();
        } else {

            $application = DB::table('job_application')
            ->join('user_regisrtration','job_application.user_id','=','user_regisrtration.id')
            ->join('jobs','job_application.job_id','=','jobs.id')
            ->select('job_application.*','user_regisrtration.profile_pic','user_regisrtration.name',
                'user_regisrtration.gender','user_regisrtration.mobile','jobs.state','jobs.city',
                'jobs.area','jobs.company_legal_name')
                ->orderby('id','desc')->get();

        }


        return (
            [
                'status' => 200,
                'application' => $application
            ]
            );
    }

    

    public function application_view_followup(Request $request ,$id)
    {
        $assign=$request->assign;

        $assign=DB::table('personal_access_tokens')->where('name' , $id)->first();

        // print_r(localStorage.getItem('isUserLogged'));
        // dd($assign->tokenable_id);
        // die();
        
        if($assign->tokenable_id != 1){
        $application = DB::table('job_application')
            ->join('user_regisrtration','job_application.user_id','=','user_regisrtration.id')
            ->join('jobs','job_application.job_id','=','jobs.id')
            ->join('application_followup_time','job_application.id','=','application_followup_time.app_id')
            ->select('job_application.*','user_regisrtration.profile_pic','user_regisrtration.name',
                'user_regisrtration.gender','user_regisrtration.mobile','jobs.state','jobs.city',
                'jobs.area','jobs.company_legal_name')
                ->where('job_application.assign',$assign->tokenable_id)
                ->where('application_followup_time.followupdate' , '=' , date('Y-m-d'))
                ->orderby('id','desc')->get();
        } else {

            $application = DB::table('job_application')
            ->join('user_regisrtration','job_application.user_id','=','user_regisrtration.id')
            ->join('jobs','job_application.job_id','=','jobs.id')
            ->leftjoin('application_followup_time','job_application.id','=','application_followup_time.app_id')
            ->select('job_application.*','user_regisrtration.profile_pic','user_regisrtration.name',
                'user_regisrtration.gender','user_regisrtration.mobile','jobs.state','jobs.city',
                'jobs.area','jobs.company_legal_name','application_followup_time.followupdate')
                ->where('application_followup_time.followupdate' , '=' , date('Y-m-d'))
                // ->whereDate('comment_at', today())
                ->orderby('id','desc')->get();

        }


        return (
            [
                'status' => 200,
                'application_follow_up' => $application
            ]
            );
    }

    function getLatestRow(Request $request , $id)
    {

        $assign=$request->assign;

        $assign=DB::table('personal_access_tokens')->where('name' , $id)->first();

        // dd($assign);

        if($assign->tokenable_id != 1){
            $getfollowupapplication = DB::table('job_application')
                ->join('user_regisrtration','job_application.user_id','=','user_regisrtration.id')
                ->join('jobs','job_application.job_id','=','jobs.id')
                ->join('application_followup_time','job_application.id','=','application_followup_time.app_id')
                ->select('job_application.*','user_regisrtration.profile_pic','user_regisrtration.name',
                    'user_regisrtration.gender','user_regisrtration.mobile','jobs.state','jobs.city',
                    'jobs.area','jobs.company_legal_name')
                    ->where('job_application.assign',$assign->tokenable_id)
                    ->where('application_followup_time.followupdate' , '=' , date('Y-m-d'))->count();
                    // print_r($getfollowupapplication);
                    // die();
                    
            } else {
                $getfollowupapplication =  DB::table('job_application')
                ->join('user_regisrtration','job_application.user_id','=','user_regisrtration.id')
                ->join('jobs','job_application.job_id','=','jobs.id')
                ->leftjoin('application_followup_time','job_application.id','=','application_followup_time.app_id')
                ->select('job_application.*','user_regisrtration.profile_pic','user_regisrtration.name',
                    'user_regisrtration.gender','user_regisrtration.mobile','jobs.state','jobs.city',
                    'jobs.area','jobs.company_legal_name','application_followup_time.followupdate')
                    ->where('application_followup_time.followupdate' , '=' , date('Y-m-d'))->count();
            }
            return (
                [
                    'status' => 200,
                    'get_application_follow_up' => $getfollowupapplication
                ]
                );
       
            // return Response::json($res);
      }
    public function application_exportData()
    {
        $application = DB::table('job_application')
            ->join(
                'user_regisrtration',
                'job_application.user_id',
                '=',
                'user_regisrtration.id'
            )
            ->join(
                'jobs',
                'job_application.job_id',
                '=',
                'jobs.id'
            )
            ->select(
                'job_application.*',
                'user_regisrtration.profile_pic',
                'user_regisrtration.name',
                'user_regisrtration.gender',
                'user_regisrtration.mobile',
                'jobs.state',
                'jobs.city',
                'jobs.area',
                'jobs.company_legal_name'
            )
            ->orderby(
                'id',
                'desc'
            )->get(
            );

        return (
            [
                'status' => 200,
                'application' => $application
            ]
            );
    }

    public function Application_assign(Request $request)
    {
        $app_id = $request->application_id;
        $assign_emp = $request->assign;
        for ($i = 0; $i < count($app_id); $i++) {
            $update = DB::table('job_application')
                ->where(
                    'id', $app_id[$i]
                )
                ->update(
                    ['assign' => $assign_emp]
                );
            if ($update) {
                return response()->json(
                    [
                        'status' => 200,
                        'message' => 'Application Assign to Employee '
                    ]
                );
            } else {
                return response()->json(
                    [
                        'status' => 404,
                        'message' => 'error'
                    ]
                );
            }
        }
    }

    public function Send_sms(Request $request)
    {
        $app_id = $request->application_id;
        $message = $request->input('message');
        if ($app_id) {
            $send_sms_emp = $request->assign;
            $sendsms = DB::table('job_application')
            ->where('id',  $request->application_id)
            ->get();
            if ($sendsms -> count() >0) {
                $composeMessage = $message;
            }            
           
            for ($i = 0; $i < count($app_id); $i++) {
                $sendsms = DB::table('job_application')
                    ->where('id', $app_id[$i])

                    ->update(
                        ['assign' => $send_sms_emp]
                    );
                if ($sendsms) {
                    return response()->json(
                        [
                            'status' => 200,
                            'message' => 'Application Assign to Employee '
                        ]
                    );
                } else {
                    return response()->json(
                        [
                            'status' => 404,
                            'message' => "error"
                        ]
                    );
                }
            }
            return response()->json(
                [
                    'status' => 404,
                    'message' => 'error'
                ]
            );
        }

        return response()->json(
            [
                'status' => 404,
                'message' => 'Please Select Application'
            ]
        );
    }


    public function Application_user($id)
    {
        $app_view = DB::table('job_application')
            ->join(
                'user_regisrtration',
                'job_application.user_id',
                '=',
                'user_regisrtration.id'
            )
            ->join(
                'jobs',
                'job_application.job_id',
                '=',
                'jobs.id'
            )
            ->select(
                'job_application.*',
                'user_regisrtration.name',
                'user_regisrtration.gender',
                'user_regisrtration.mobile',
                'jobs.state',
                'jobs.job_category',
                'jobs.city',
                'jobs.area',
                'jobs.company_legal_name'
            )
            ->where(
                'job_application.id',
                $id
            )
            ->orderby(
                'id',
                'desc'
            )->get(
            );


        if ($app_view) {
            return response()->json(
                [
                    'status' => 200,
                    'app' => $app_view
                ]
            );
        } else {
            return response()->json(
                [
                    'status' => 404,
                    'message' => ' Application  Id Not Found'
                ]
            );

        }
    }

    public function application_status(Request $request, $id)
    {
        $status = $request->input('status');
        $application = DB::table('job_application')->where('id', $id)
            ->update(
                ['status' => $status]
            );
        if ($application) {
            return response()->json(
                [
                    'status' => 200,
                    'message' => ' Application  status changed'
                ]
            );
        } else {
            return response()->json(
                [
                    'status' => 404,
                    'message' => ' Application  status not changed'
                ]
            );
        }
    }

    public function application_remark(Request $request, $id)
    {
        $remark = $request->input('remark');
        $application = DB::table('job_application')->where('id', $id)
            ->update(
                ['remark' => $remark]
            );
        if ($application) {
            return response()->json(
                [
                    'status' => 200,
                    'message' => 'Remark added on Application  '
                ]
            );
        } else {
            return response()->json(
                [
                    'status' => 404,
                    'message' => ' Remark not added on Application  '
                ]
            );
        }
    }

    public function applcation_followup(Request $request)
    {
        $comment = $request->input('comment');
        $followupdate = $request->input('followupdate');
        $app_id = $request->input('app_id');
        $comment_at = date('d M,Y');
        $comment_time = date('h:i:s a');
        $query = DB::table('application_followup_time')->insert(['app_id' => $app_id, 'comment' => $comment, 'followupdate' => $followupdate , 'comment_at' => $comment_at, 'comment_time' => $comment_time]);
        if ($query) {
            return response()->json(
                [
                    'status' => 200,
                    'message' => 'Comment added on Application  '
                ]
            );
        } else {
            return response()->json(
                [
                    'status' => 404,
                    'message' => ' Comment not added on Application  '
                ]
            );
        }
    }

    public function applcation_followup_fetch($id)
    {
        $follow = DB::table('application_followup_time')->where(['app_id' => $id])->get();

        return response()->json(
            [
                'status' => 200,
                'follow' => $follow
            ]
        );
    }

}