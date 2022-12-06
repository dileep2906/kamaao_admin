<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hot_offers', function (Blueprint $table) {
            $table->id();
            $table->string('offer_legal_name');
            $table->string('offer_popular_name');
            $table->string('offer_url');
            $table->string('offer_logo');
            $table->string('about_offer');
            $table->string('call_action1');
            $table->string('call_action');
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
        Schema::dropIfExists('hot_offers');
    }
}
