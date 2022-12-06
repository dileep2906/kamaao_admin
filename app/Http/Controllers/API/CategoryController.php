<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Storage;
use File;

class CategoryController extends Controller
{
    public function index()
    {
        # code...
        $Category= Category::all();

        return response()->json([
                'status'=>200,
                'category'=>$Category
        ]);

    }

    public function edit($id){
        $Category = Category::find($id);
        if($Category){
        return response()->json([
            'status'=>200,
            'category'=>$Category
            ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>' Category Id Not Found'
                    ]);
                
            }
    }
    public function store(Request $request)
    {
        $validater = Validator::make($request->all(),[
            'cat_name'=>'unique:categories,cat_name',
            
        ]);

        if($validater->fails())
        {
                return response()->json([
                        'status'=>505,
                        'validation_errors'=>$validater->messages()
                ]);
        }else{
            $Category = new Category;
            $Category->cat_name=$request->input('cat_name');
           
            $Category->status='enable';

        $Category->save();
            return response()->json([
                'status'=>200,
                'message'=>'Category Details Inserted Successfully'
        ]);
        }
     }


     public function update(Request $request,$id)
     {
         $validater = Validator::make($request->all(),[
             'cat_name'=>'unique:categories,cat_name',
             
         ]);
 
         if($validater->fails())
         {
                 return response()->json([
                         'status'=>505,
                         'validation_errors'=>$validater->messages()
                 ]);
         }else{
            $Category =  Category::find($id);
            if($Category){
             $Category->cat_name=$request->input('cat_name');
            
             $Category->status='enable';
 
         $Category->save();
             return response()->json([
                 'status'=>200,
                 'message'=>'Category Details Update Successfully'
         ]);
         }else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Category Id  Not Found'
            ]);
    
            }
        }
        
      }







     public function enable_status(Request $request, $id)
   {
       # code...
       
       $Category=Category::find($id);
       if($Category){
           $Category->status='enable';
           $Category->save();
           return response()->json([
               'status'=>200,
               'message'=>'Category status enable'
           ]);
       }
      
       
       
      

   }
   public function disable_status(Request $request, $id)
   {
       # code...
       
       $Category=Category::find($id);
       if($Category){
           $Category->status='disable';
           $Category->save();
           return response()->json([
               'status'=>200,
               'message'=>'Category status disable'
           ]);
       }
      
       
       
      

   }
    public function delete(Request $request, $id)
    {
        # code...
        $Category = Category::find($id);
        
        
        $Category->delete();
        return response()->json([
            'status'=>204,
            'message'=>'Category Details  Deleted'
        ]);
        

    }
    

    public function procategory(Request $request ){
            $cat_name=$request->input('cat_name');
            $created_at	=date('d M,Y h:i:s a');
            $updated_at=date('d M,Y h:i:s a');
            $query=DB::table('product_categories')->insert(['cat_name' =>$cat_name, 'status' =>'enable','created_at'=>$created_at ,'updated_at'=>$updated_at]);
            if($query){
                return response()->json([
                    'status'=>200,
                    'message'=>'Comment added on Application  '
                    ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>' Comment not added on Application  '
                    ]);
            }
    }


    public function pro_cat()
    {
        # code...
        $Category= DB::table('product_categories')->get();

        return response()->json([
                'status'=>200,
                'procategory'=>$Category
        ]);

    }

    public function pro_catedit($id)
    {

        $Category = DB::table('product_categories')->where(['id'=>$id])->get();
        if($Category){
        return response()->json([
            'status'=>200,
            'category'=>$Category
            ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>' Category Id Not Found'
                    ]);
                
            }

    }
    
    public function pro_catupdate(Request $request,$id)
    {
        $validater = Validator::make($request->all(),[
            'cat_name'=>'unique:product_categories,cat_name',
            
        ]);

        if($validater->fails())
        {
                return response()->json([
                        'status'=>505,
                        'validation_errors'=>$validater->messages()
                ]);
        }else{
           $Category = DB::table('product_categories')->find($id);
           if($Category){
            $cat_name=$request->input('cat_name');
           
            $status='enable';

        $update=DB::table('product_categories')
        ->where('id', $id)
        ->update(['cat_name' => $cat_name,'status'=>$status]);
            return response()->json([
                'status'=>200,
                'message'=>'Category Details Update Successfully'
        ]);
        }else{
               return response()->json([
                   'status'=>404,
                   'message'=>'Category Id  Not Found'
           ]);
   
           }
       }
       
     }






    }
