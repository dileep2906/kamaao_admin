<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class dynamic_dropdownController extends Controller
{
    public function state(){
        $state=DB::table('states')->get();

        return response()->json([
                'status'=>200,
                'state'=>$state
        ]);
    }

    public function city(Request $request,$id){
        $city=DB::table('cities')->where(['state_id'=>$id])->get();

        return response()->json([
                'status'=>200,
                'city'=>$city
        ]);
    }
    public function area(Request $request,$id){
        $area=DB::table('areas')->where(['city_id'=>$id])->get();

        return response()->json([
                'status'=>200,
                'area'=>$area
        ]);
    }

    public function product(){
        $product=DB::table('store_product')->get();
        // dd($product);
        return response()->json([
                'status'=>200,
                'product'=>$product
        ]);
    }

    public function category(Request $request,$id){
        $store_categories=DB::table('store_categories')->where(['product_id'=>$id])->get();
        // dd($store_categories);
        return response()->json([
                'status'=>200,
                'category'=>$store_categories
        ]);
    }
    public function subCategory(Request $request,$id){
        $sub_category=DB::table('store_sub_category')->where(['category_id'=>$id])->get();

        return response()->json([
                'status'=>200,
                'sub_category'=>$sub_category
        ]);
    }

    public function job_category(){
        $job_category=DB::table('categories')->where(['status'=>'enable'])->get();

        return response()->json([
                'status'=>200,
                'job_category'=>$job_category
        ]);
    }
    
}
