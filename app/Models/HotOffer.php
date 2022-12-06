<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotOffer extends Model
{
    use HasFactory;

    protected $table ='hot_offers';
    protected $fillable = [
        'offer_legal_name',
        'offer_popular_name',
        'offer_url',
        'offer_logo',
        'about_offer',
        'call_action1',
        'call_action',
        'status',
    ];
}
