<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = ['company_legal_name','company_popular_name','company_url','company_logo','about_company','call_action',
    "call_action1",
    "project_title",
    "sub_title",
    "project_type",
    "expiry_date",
    "total_openings",
    "amt",
    "task",
    "term_condition",
    "add_rewa",
    "mini_edu_req",
    "experience_req",
    "skill_req",
    "doc_req",
    "add_req",
    "status"
];
}
