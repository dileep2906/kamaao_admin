<?php



namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\HotOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Storage;
use File;

class HotOfferController extends Controller
{
    public function index()
    {
        # code...
        $HotOffer = HotOffer::all();

        return response()->json(
            [
                'status' => 200,
                'hot_offer' => $HotOffer
            ]
        );

    }
    public function select_company($offer_legal_name)
    {
        $HotOffer = HotOffer::find($offer_legal_name);
        if ($HotOffer) {
            return response()->json(
                $HotOffer
            );
        } else {
            return response()->json(
                [
                    'status' => 404,
                    'message' => ' HotOffer Id Not Found'
                ]
            );

        }

    }
    public function edit($id)
    {
        $HotOffer = HotOffer::find($id);
        if ($HotOffer) {
            return response()->json(
                [
                    'status' => 200,
                    'hot_offer' => $HotOffer
                ]
            );
        } else {
            return response()->json(
                [
                    'status' => 404,
                    'message' => ' HotOffer Id Not Found'
                ]
            );

        }
    }
    public function storeHotOffer(Request $request)
    {
        $validater = Validator::make(
            $request->all(),
            [
                'offer_legal_name' => 'required|max:191|unique:hot_offers,offer_legal_name',
                'offer_popular_name' => 'required|max:191',
                'offer_price' => 'required|max:191',
                'offer_logo' => 'required|mimes:jpeg,jpg,png',
                'about_offer' => 'required|max:191',
                //'call_action'=>'required|max:191'

            ]
        );

        if ($validater->fails()) {
            return response()->json(
                [
                    'validation_errors' => $request->all()
                ]
            );
        } else {
            $HotOffer = new HotOffer;
            $HotOffer->offer_legal_name = $request->input('offer_legal_name');
            $HotOffer->offer_popular_name = $request->input('offer_popular_name');
            $HotOffer->offer_price = $request->input('offer_price');
            $HotOffer->about_offer = $request->input('about_offer');
            $HotOffer->call_action = $request->input('call_action');
            $HotOffer->actual_price = $request->input('actual_price');
            $HotOffer->status = 'enable';





            if ($request->hasfile('offer_logo')) {
                $image = $request->file('offer_logo');
                $ext = $image->extension();
                $image_name = time() . '.' . $ext;
                $image->move(public_path('offer'), $image_name);
                $HotOffer->offer_logo = $image_name;
            }


            $HotOffer->save();
            return response()->json(
                [
                    'status' => 200,
                    'message' => 'HotOffer Details Inserted Successfully'
                ]
            );
        }

    }

    public function update(Request $request, $id)
    {
        $validater = Validator::make(
            $request->all(),
            [
                'offer_legal_name' => 'required|max:191',
                'offer_popular_name' => 'required|max:191',
                'offer_price' => 'required|max:191',
                // 'offer_logo' => 'required|mimes:jpeg,jpg,png',
                'about_offer' => 'required|max:191',
                //'call_action'=>'required|max:191'

            ]
        );

        if ($validater->fails()) {
            return response()->json(
                [
                    'status' => 422,
                    'validation_errors' => $validater->messages(),
                ]
            );
        } else {

            $HotOffer = HotOffer::find($id);
            if ($HotOffer) {
                $HotOffer->offer_legal_name = $request->input('offer_legal_name');
                $HotOffer->offer_popular_name = $request->input('offer_popular_name');
                $HotOffer->offer_price = $request->input('offer_price');
                $HotOffer->about_offer = $request->input('about_offer');
                $HotOffer->call_action = $request->input('call_action');
                $HotOffer->actual_price = $request->input('actual_price');

                if ($request->hasfile('offer_logo')) {
                    $Image = DB::table('hot_offers')->where(['id' => $id])->get();
                    $file = public_path('offer/' . $Image[0]->offer_logo);
                    if (File::exists($file)) {
                        File::delete($file);
                    }
                    $image = $request->file('offer_logo');
                    $ext = $image->extension();
                    $image_name = time() . '.' . $ext;
                    $image->move(public_path('offer'), $image_name);
                    $HotOffer->offer_logo = $image_name;
                }

                $HotOffer->save();
                return response()->json(
                    [
                        'status' => 200,
                        'message' => 'HotOffer Details updated'

                    ]
                );
            } else {
                return response()->json(
                    [
                        'status' => 404,
                        'message' => 'HotOffer Id  Not Found'
                    ]
                );

            }
        }
    }

    public function enable_company(Request $request, $id)
    {
        # code...

        $HotOffer = HotOffer::find($id);
        if ($HotOffer) {
            $HotOffer->status = 'enable';
            $HotOffer->save();
            return response()->json(
                [
                    'status' => 200,
                    'message' => 'HotOffer status enable'
                ]
            );
        }





    }
    public function disable_company(Request $request, $id)
    {
        # code...

        $HotOffer = HotOffer::find($id);
        if ($HotOffer) {
            $HotOffer->status = 'disable';
            $HotOffer->save();
            return response()->json(
                [
                    'status' => 200,
                    'message' => 'HotOffer status disable'
                ]
            );
        }





    }
    public function delete(Request $request, $id)
    {
        # code...
        $HotOffer = HotOffer::find($id);

        $Image = DB::table('hot_offers')->where(['id' => $id])->get();
        $file = public_path('offer/' . $Image[0]->offer_logo);
        if (File::exists($file)) {
            File::delete($file);

        }
        $HotOffer->delete();
        return response()->json(
            [
                'status' => 204,
                'message' => 'HotOffer Details  Deleted'
            ]
        );


    }
}