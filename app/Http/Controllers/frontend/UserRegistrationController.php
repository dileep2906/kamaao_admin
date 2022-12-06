<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;

use App\Models\frontend\User_registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use File;
use Illuminate\Support\Facades\URL;


class UserRegistrationController extends Controller
{



    public function phone_number(Request $request)
    {
        $validater = Validator::make(
            $request->all(),
            [
                'email' => 'required|max:191|unique:user_registrations,email',               
            ]
        );

        if ($validater->fails()) {
            return response()->json(
                [
                    'message' => "Email  ID Already Exists"
                ]
            );
        } else {
        $otp = rand(33333, 99999);

        $user_registration = User_registration::where('phone', $request->phone)->first();


        if ($user_registration) {
            
            $update = DB::table('user_registrations')
                ->where(
                    'phone', $request->phone
                )
                ->update(
                    [
                    'name' => $request->name,                    
                    'otp' => $otp,
                    'language' => $request->language,                    
                    "email" => $request->email,
                    "alternet_number" => $request->alternet_number,
                    "pincode" => $request->pincode,
                    "area" => $request->area,
                    "location" => $request->location,
                    "dob" => $request->dob,
                    "gender" => $request->gender,
                    "education" => $request->education,
                    "status" => $request->status,  
                    "profile_pic" =>$request->profile_pic
                    ]
                );

                // if (request()->hasFile('profile_pic') && request('profile_pic') != '') {

                    $imagePath = public_path('frontend/Profile_pic/'.$request->profile_pic);
                    // if(File::exists($imagePath)){
                    //     unlink($imagePath);
                    // }

                    // $file = $request->file('profile_pic');
                    // $filename = uniqid() . "_" . $file->getClientOriginalName();
                    // $file->move(public_path('frontend/Profile_pic'), $filename);
                    // $url = URL::to('/') . '/frontend/Profile_pic/' . $filename;
                    // $user_registration['profile_pic'] = $url;
                    $user_registration->update();

                // }
                

            return response()->json(
                [
                    'status' => 200,
                    'username' => $user_registration->name,
                    'user_id' => $user_registration->id,
                    'message' => 'Otp Send Successfully',
                    'msg' => 'Your One Time Password Is' . ' ' . $otp
                ]
            );

        } else {
            $user_registration = User_registration::create(
                [
                    // 'name' => $request->name,
                    'phone' => $request->phone,
                    'otp' => $otp,
                    // 'language' => $request->language,                    
                    // "email" => $request->email,
                    // "alternet_number" => $request->alternet_number,
                    // "pincode" => $request->pincode,
                    // "area" => $request->area,
                    // "location" => $request->location,
                    // "dob" => $request->dob,
                    // "gender" => $request->gender,
                    // "education" => $request->education,
                    // "status" => $request->status,                 

                    // "profile_pic" => $request->profile_pic,                  
                    
                ]

                
            );

                   

            return response()->json(
                [
                    'status' => 200,
                    'username' => $user_registration->name,
                    'user_id' => $user_registration->id,
                    'message' => 'Otp Send Successfully',
                    'msg' => 'Your One Time Password Is' . ' ' . $otp

                ]
            );
        }
    }   
    }


    public function verify_number(Request $request)
    {
        $verify_number = User_registration::where(['phone' => $request->phone, 'otp' => $request->otp])->first();
        if ($verify_number) {
            return response()->json(
                [
                    'status' => 200,
                    'username' => $verify_number->name,
                    'user_id' => $verify_number->id,
                    'msg' => $verify_number


                ]
            );
        } else {
            return response()->json(
                [
                    'status' => 404,
                    'msg' => 'Your Otp and Phone Number Does Not Match'
                ]
            );
        }
    }

    public function show(User_registration $user_registration)
    {
        //
    }


    public function edit(User_registration $user_registration)
    {
        //
    }

/**
 * Update the specified resource in storage.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \App\Models\frontend\User_registration  $user_registration
 * @return \Illuminate\Http\Response
 */

}