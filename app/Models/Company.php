<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = ['company_legal_name','company_popular_name','company_url','company_logo','about_company','call_action',
    "call_action1"];
}
