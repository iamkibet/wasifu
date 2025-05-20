<?php

namespace App\Policies;

use App\Models\ContactGroup;
use App\Models\User;

class ContactGroupPolicy
{
    public function view(User $user, ContactGroup $group): bool
    {
        return $user->id === $group->user_id;
    }

    public function update(User $user, ContactGroup $group): bool
    {
        return $user->id === $group->user_id;
    }

    public function delete(User $user, ContactGroup $group): bool
    {
        return $user->id === $group->user_id;
    }
}
