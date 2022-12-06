<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::view('/','welcome');
Route::get('/admin', function () {
    return view('welcome');
});
Route::view('/admin/dashboard','admindashboard');
// Auth::routes();

Route::view('/admin/add_category','admindashboard');

Route::view('/admin/view_category','admindashboard');
Route::view('/admin/edit_category/{id}','admindashboard');
Route::view('/admin/add_procategory','admindashboard');
Route::view('/admin/view_procategory','admindashboard');
Route::view('/admin/edit_procategory/{id}','admindashboard');

Route::view('admin/add_job','admindashboard');
Route::view('admin/view_jobs','admindashboard');
Route::view('admin/edit_jobs/{id}','admindashboard');

Route::view('admin/add_employee','admindashboard');
Route::view('admin/view_employee','admindashboard');
Route::view('admin/edit_employee/{id}','admindashboard');


Route::view('admin/add_task','admindashboard');
Route::view('admin/view_task','admindashboard');
Route::view('admin/edit_task/{id}','admindashboard');

Route::view('admin/orders','admindashboard');

Route::view('admin/add_company_details','admindashboard');
Route::view('/admin/view_company','admindashboard');
Route::view('/admin/edit_company/{id}','admindashboard');
//view_projects
Route::view('/admin/add_projects','admindashboard');
Route::view('/admin/view_projects','admindashboard');
Route::view('/admin/edit_project/{id}','admindashboard');
Route::view('/admin/view_projects','admindashboard');
Route::view('/admin/edit_project/{id}','admindashboard');
//view Application
Route::view('/admin/all_application','admindashboard');
Route::view('/admin/application_view/{id}','admindashboard');
// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// view Hot Offers
Route::view('/admin/hot_offers','admindashboard');
Route::view('/admin/add_hot_offer' , 'admindashboard');
Route::view('/admin/view_hot_offer' , 'admindashboard');
Route::view('/admin/edit_offer/{id}','admindashboard');

// view Store
Route::view('/admin/store','admindashboard');
Route::view('/admin/add_store','admindashboard');

//view University
Route::view('/admin/university','admindashboard');

//view Settings
Route::view('/admin/settings','admindashboard');

//view Reports
Route::view('/admin/reports','admindashboard');

// view Help & Support
Route::view('/admin/help_support','admindashboard');
