<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            
            $table->string('task_title');
            $table->string('price');
            $table->string('per_download');
            $table->string('expiry_date');
            $table->string('total_openings');
            $table->string('steps');
            $table->string('term_condition');
            $table->string('add_rew');
            
            $table->string('company_legal_name');
            $table->string('company_popular_name');
            $table->string('company_url');
            $table->string('company_logo');
            $table->string('about_company');
            $table->string('call_action1');
            $table->string('call_action');
           
            $table->string('ref_link');
            $table->string('ref_code');
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
        Schema::dropIfExists('tasks');
    }
}
