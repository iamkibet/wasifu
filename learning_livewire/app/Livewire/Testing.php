<?php

namespace App\Livewire;

use Livewire\Component;

class Testing extends Component
{
    public $name = 'john';

    public function changeName($name)
    {
        $this->name = $name;
    }
    public function render()
    {
        return view('livewire.testing');
    }
}
