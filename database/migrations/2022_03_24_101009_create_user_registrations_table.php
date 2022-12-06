<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRegistrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('phone')->unique();
            $table->string('otp');
            $table->string('language');
            $table->string('profile_pic');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('alternet_number');

            $table->string('pincode');
            $table->string('area');
            $table->string('location');
            $table->string('dob');
            $table->string('gender');
            $table->string('education');
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
        Schema::dropIfExists('user_registrations');
    }
}
