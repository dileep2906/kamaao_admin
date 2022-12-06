<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class JobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('job_title');
            $table->string('sub_title');
            $table->string('job_type');
            $table->string('job_category');
            $table->string('expiry_date');
            $table->string('total_openings');
            $table->string('salary_min');
            $table->string('salary_max');
            $table->string('state');
            $table->string('city');
            $table->string('area');
            $table->string('descri_video'); 
            $table->string('roles_responsibilities');
            $table->string('company_legal_name');
            $table->string('company_popular_name');
            $table->string('company_url');
            $table->string('company_logo');
            $table->string('about_company');
            $table->string('call_action1');
            $table->string('call_action');
            $table->string('mini_edu_req');
            $table->string('experience_req');
            $table->string('skill_req');
            $table->string('doc_req');
            $table->string('add_req');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('jobs');
    }
}
