<?php


use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\JobsController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\dynamic_dropdownController;
use App\Http\Controllers\Api\ApplicationController;

use App\Http\Controllers\frontend\UserRegistrationController;
use App\Http\Controllers\Api\HotOfferController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/* ---------------------- Admin Api Start ----------------------*/
//for admin login
Route::middleware(['auth:sanctum'])->group(function (){
    Route::post('/logout',[AuthController::class,'logout']);

});
Route::post('/admin_register',[AuthController::class,'register']);
Route::post('/add_employee',[AuthController::class,'add_employee']);
Route::get('/view_employee',[AuthController::class,'view_employee']);
Route::get('/assign_employee',[AuthController::class,'assign_employee']);
Route::post('/enable_employee/{id}',[AuthController::class,'enable_employee']);
Route::post('/disable_employee/{id}',[AuthController::class,'disable_employee']);
Route::get('/edit_employee/{id}',[AuthController::class,'edit']);
Route::post('/update_employee/{id}',[AuthController::class,'update_employee']);
Route::get('/check_user/{id}',[AuthController::class,'check_user']);
Route::get('/get_user/{id}',[AuthController::class,'edit']);

Route::delete('/delete_employee/{id}',[AuthController::class,'employe_delete']);

Route::post('/admin_login',[AuthController::class,'login']);
//login with google
Route::post('/logingoogle',[AuthController::class,'google_login']);
// Company

Route::post('/add_company',[CompanyController::class,'store']);
Route::get('/view_company',[CompanyController::class,'index']);
Route::get('/edit_company/{id}',[CompanyController::class,'edit']);
Route::post('/update_company/{id}',[CompanyController::class,'update']);
Route::delete('/delete_company/{id}',[CompanyController::class,'delete']);
Route::post('/enable_company/{id}',[CompanyController::class,'enable_company']);
Route::post('/disable_company/{id}',[CompanyController::class,'disable_company']);
Route::get('/fetch_company/{company_legal_name}',[CompanyController::class,'select_company']);


//Category

Route::post('/add_category',[CategoryController::class,'store']);

Route::get('/view_category',[CategoryController::class,'index']);
Route::get('/edit_category/{id}',[CategoryController::class,'edit']);
Route::post('/update_category/{id}',[CategoryController::class,'update']);
Route::delete('/delete_category/{id}',[CategoryController::class,'delete']);
Route::post('/disable_category/{id}',[CategoryController::class,'disable_status']);
Route::post('/enable_category/{id}',[CategoryController::class,'enable_status']);

Route::post('/add_procategory',[CategoryController::class,'procategory']);
Route::get('/view_procategory',[CategoryController::class,'pro_cat']);
Route::get('/edit_procategory/{id}',[CategoryController::class,'pro_catedit']);
Route::post('/update_procategory/{id}',[CategoryController::class,'pro_catupdate']);
Route::delete('/delete_procategory/{id}',[CategoryController::class,'pro_catdelete']);
Route::post('/disable_procategory/{id}',[CategoryController::class,'pro_catdisable_status']);
Route::post('/enable_procategory/{id}',[CategoryController::class,'pro_catenable_status']);

//Jobs

Route::post('/add_job',[JobsController::class,'store']);
Route::get('/view_jobs',[JobsController::class,'index']);
Route::get('/edit_jobs/{id}',[JobsController::class,'edit']);
Route::post('/update_jobs/{id}',[JobsController::class,'update']);
Route::delete('/delete_jobs/{id}',[JobsController::class,'delete']);
Route::post('/disable_jobs/{id}',[JobsController::class,'disable_status']);
Route::post('/enable_jobs/{id}',[JobsController::class,'enable_status']);

//Tasks

Route::post('/add_task',[TaskController::class,'store']);
Route::get('/view_task',[TaskController::class,'index']);
Route::get('/edit_task/{id}',[TaskController::class,'edit']);
Route::post('/update_task/{id}',[TaskController::class,'update']);
Route::delete('/delete_task/{id}',[TaskController::class,'delete_task']);
Route::post('/disable_task/{id}',[TaskController::class,'disable_status']);
Route::post('/enable_task/{id}',[TaskController::class,'enable_status']);

//Project 

Route::post('/add_project',[ProjectController::class,'store']);
Route::get('/view_project',[ProjectController::class,'index']);
Route::get('/edit_project/{id}',[ProjectController::class,'edit']);
Route::post('/update_project/{id}',[ProjectController::class,'update']);
Route::delete('/delete_project/{id}',[ProjectController::class,'delete']);
Route::post('/disable_project/{id}',[ProjectController::class,'disable_status']);
Route::post('/enable_project/{id}',[ProjectController::class,'enable_status']);

//application 

Route::any('/view_application/{id}',[ApplicationController::class,'application_view']);
Route::any('/view_applicationfollowup/{id}',[ApplicationController::class,'application_view_followup']);
Route::get('/export_application',[ApplicationController::class,'application_exportData']);
Route::post('/assign_application',[ApplicationController::class,'Application_assign']);
Route::post('/send_sms',[ApplicationController::class,'Send_sms']);
Route::get('/application_view/{id}',[ApplicationController::class,'Application_user']);
Route::post('/application_status/{id}',[ApplicationController::class,'application_status']);
Route::post('/application_remark/{id}',[ApplicationController::class,'application_remark']);
Route::post('/applcation_followup/',[ApplicationController::class,'applcation_followup']);
Route::get('/applcation_followup_fetch/{id}',[ApplicationController::class,'applcation_followup_fetch']);
Route::delete('/delete_project/{id}',[ProjectController::class,'delete']);
Route::any('/get_applicationfollowup/{id}',[ApplicationController::class,'getLatestRow']);
//Hot Offer

Route::post('/add_offer' , [HotOfferController::class , 'storeHotOffer']);
Route::get('/view_offer',[HotOfferController::class,'index']);
Route::get('/edit_offer/{id}',[HotOfferController::class,'edit']);
Route::post('/update_offer/{id}',[HotOfferController::class,'update']);
Route::delete('/delete_offer/{id}',[HotOfferController::class,'delete']);
Route::post('/enable_offer/{id}',[HotOfferController::class,'enable_company']);
Route::post('/disable_offer/{id}',[HotOfferController::class,'disable_company']);
Route::get('/fetch_offer/{offer_legal_name}',[HotOfferController::class,'select_company']);


//Store 

Route::post('/add_store',[ProjectController::class,'store']);
Route::get('/view_store',[ProjectController::class,'index']);
Route::get('/edit_store/{id}',[ProjectController::class,'edit']);
Route::post('/update_store/{id}',[ProjectController::class,'update']);
Route::delete('/delete_store/{id}',[ProjectController::class,'delete']);
Route::post('/disable_store/{id}',[ProjectController::class,'disable_status']);
Route::post('/enable_store/{id}',[ProjectController::class,'enable_status']);

//dynamic_dropdown

Route::get('/state',[dynamic_dropdownController::class,'state']);
Route::get('/city/{id}',[dynamic_dropdownController::class,'city']);
Route::get('/area/{id}',[dynamic_dropdownController::class,'area']);
Route::get('/job_category',[dynamic_dropdownController::class,'job_category']);



Route::get('/product',[dynamic_dropdownController::class,'product']);
Route::get('/category/{id}',[dynamic_dropdownController::class,'category']);
Route::get('/sub_category/{id}',[dynamic_dropdownController::class,'subCategory']);


/* ---------------------- Admin Api End ----------------------*/


/* ---------------------- Front Api Start ----------------------*/

//user registration
Route::post('/user_login',[UserRegistrationController::class,'phone_number']);
Route::post('/verify_user',[UserRegistrationController::class,'verify_number']);

// view job 

Route::get('/frontend_view_jobs',[JobsController::class,'frontendJobview']);

// view task 

Route::get('/frontend_view_task',[TaskController::class,'frontendViewtask']);

// view projects 

Route::get('/frontend_view_project',[ProjectController::class,'frontendViewproject']);

// filter job type

Route::get('/frontend_filter_jobs',[JobsController::class,'frontendJobfilter']);

// short by

Route::get('/frontend_short_by',[JobsController::class,'frontendJobshortby']);

// price range

Route::get('/frontend_price_range',[JobsController::class,'frontendPricerange']);

// Category

Route::get('/frontend_category',[JobsController::class,'frontendCategory']);

// Location

Route::get('/frontend_location',[JobsController::class,'frontendLocation']);
/* ---------------------- Front Api End ----------------------*/
