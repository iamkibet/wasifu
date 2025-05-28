<?php

namespace App\Exceptions;

use Exception;

class GeminiException extends Exception
{
    public function render($request)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'error' => 'Failed to generate document',
                'message' => $this->getMessage()
            ], 500);
        }

        return redirect()->back()
            ->with('error', 'Failed to generate document: ' . $this->getMessage());
    }
}
