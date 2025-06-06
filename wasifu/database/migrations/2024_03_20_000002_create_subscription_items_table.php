<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('subscription_items')) {
            Schema::create('subscription_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('subscription_id')->constrained()->cascadeOnDelete();
                $table->string('stripe_id')->index();
                $table->string('stripe_product');
                $table->string('stripe_price');
                $table->integer('quantity')->nullable();
                $table->timestamps();

                $table->unique(['subscription_id', 'stripe_price']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('subscription_items');
    }
};
