<?php


namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Storage;
use File;

class CompanyController extends Controller
{
    public function index()
    {
        # code...
        $Company= Company::all();

        return response()->json([
                'status'=>200,
                'company'=>$Company
        ]);

    }
    public function select_company($company_legal_name){
        $Company = Company::find($company_legal_name);
        if($Company){
        return response()->json(
            $Company
            );
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>' Company Id Not Found'
                    ]);
                
            }

    }
    public function edit($id){
        $Company = Company::find($id);
        if($Company){
        return response()->json([
            'status'=>200,
            'company'=>$Company
            ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>' Company Id Not Found'
                    ]);
                
            }
    }
    public function store(Request $request)
    {
        $validater = Validator::make($request->all(),[
            'company_legal_name'=>'required|max:191|unique:companies,company_legal_name',
            'company_popular_name'=>'required|max:191',
            'company_url'=>'required|max:191',
            'company_logo'=>'required|mimes:jpeg,jpg,png',
            'about_company'=>'required|max:191',
            //'call_action'=>'required|max:191'
        ]);

        if($validater->fails())
        {
                return response()->json([
                        'validation_errors'=>$validater->messages()
                ]);
        }else{
            $Company = new Company;
            $Company->company_legal_name=$request->input('company_legal_name');
            $Company->company_popular_name=$request->input('company_popular_name');
            $Company->company_url=$request->input('company_url');
            $Company->about_company=$request->input('about_company');
            $Company->call_action=$request->input('call_action');
            $Company->call_action1=$request->input('call_action1');
            $Company->status='enable';
           
           
           
            
                
        if($request->hasfile('company_logo')){
            $image=$request->file('company_logo');
            $ext=$image->extension();
            $image_name=time().'.'.$ext;
            $image->move(public_path('company'),$image_name);
            $Company->company_logo=$image_name;
        }

        
        $Company->save();
            return response()->json([
                'status'=>200,
                'message'=>'Company Details Inserted Successfully'
        ]);
        }

    }

    public function update(Request $request, $id)
    {    $validater = Validator::make($request->all(),[
        'company_legal_name'=>'required|max:19',
        'company_popular_name'=>'required|max:191',
        

        'company_url'=>'required|max:191',
        'about_company'=>'required|max:191',
        //'call_action'=>'required|max:191'
    ]);

    if($validater->fails())
    {
            return response()->json([
                    'status'=>422,
                    'validation_errors'=>$validater->messages(),
            ]);
    }else{
   
                    $Company =  Company::find($id);
                    if($Company){
                    $Company->company_legal_name=$request->input('company_legal_name');
                    $Company->company_popular_name=$request->input('company_popular_name');
                    $Company->company_url=$request->input('company_url');
                    $Company->about_company=$request->input('about_company');
                    $Company->call_action=$request->input('call_action');
                    $Company->call_action1=$request->input('call_action1');
                        
                    if($request->hasfile('company_logo')){
                    $Image=DB::table('companies')->where(['id'=>$id])->get();
                    $file=public_path('company/'.$Image[0]->company_logo);
                    if(File::exists($file)){
                        File::delete($file);
                    }
                    $image=$request->file('company_logo');
                    $ext=$image->extension();
                    $image_name=time().'.'.$ext;
                    $image->move(public_path('company'),$image_name);
                    $Company->company_logo=$image_name;
                }

                $Company->save();
                    return response()->json([
                        'status'=>200,
                        'message'=>'Company Details updated'

                ]);
                }else{
                    return response()->json([
                        'status'=>404,
                        'message'=>'Company Id  Not Found'
                ]);
            
        }
    }
   }   

   public function enable_company(Request $request, $id)
   {
       # code...
       
       $Company=Company::find($id);
       if($Company){
           $Company->status='enable';
           $Company->save();
           return response()->json([
               'status'=>200,
               'message'=>'Company status enable'
           ]);
       }
      
       
       
      

   }
   public function disable_company(Request $request, $id)
   {
       # code...
       
       $Company=Company::find($id);
       if($Company){
           $Company->status='disable';
           $Company->save();
           return response()->json([
               'status'=>200,
               'message'=>'Company status disable'
           ]);
       }
      
       
       
      

   }
    public function delete(Request $request, $id)
    {
        # code...
        $Company = Company::find($id);
        
        $Image=DB::table('companies')->where(['id'=>$id])->get();
            $file=public_path('company/'.$Image[0]->company_logo);
        if(File::exists($file)){
            File::delete($file);
            
        }
        $Company->delete();
        return response()->json([
            'status'=>204,
            'message'=>'Company Details  Deleted'
        ]);
        

    }
}
