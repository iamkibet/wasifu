<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user->onFreePlan() && $user->documentCountThisMonth() >= 2) {
            return redirect()->route('plans')->with('error', 'You have reached your monthly limit. Please upgrade to Pro for unlimited generations.');
        }

        return $next($request);
    }
}
