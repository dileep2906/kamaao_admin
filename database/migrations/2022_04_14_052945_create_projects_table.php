<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
       
            $table->string('project_title');
            $table->string('sub_title');
            $table->string('project_type');
            $table->string('expiry_date');
            $table->string('total_openings');
            $table->string('amt');
            $table->string('state');
            $table->string('city');
            $table->string('area');
            $table->string('descri_video'); 
            $table->text('task');
            $table->text('term_condition');
            $table->text('add_rewa');
            $table->string('company_legal_name');
            $table->string('company_popular_name');
            $table->string('company_url');
            $table->string('company_logo');
            $table->text('about_company');
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
        Schema::dropIfExists('projects');
    }
}
