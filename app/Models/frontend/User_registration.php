<?php

namespace App\Models\frontend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_registration extends Model
{
    use HasFactory;
    protected $fillable =
        [
            "phone",
            "otp",
            "language",
            "profile_pic",
            "name",
            "email",
            "alternet_number",
            "pincode",
            "area",
            "location",
            "dob",
            "gender",
            "education",
            "status"
        ];
}