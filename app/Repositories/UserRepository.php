<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function createUpdate($params){

        return $this->model->updateOrCreate(
            [
                'email' => $params['email']
            ],[
                'name' => $params['name'],
                'password' => bcrypt($params['password'])
            ]
        );
    }

    public function getAll(){
        return $this->model->all();
    }

    public function find($id){
        return $this->model->findOrFail($id);
    }

    public function delete($id){
        return tap($this->findOrFail($id))->delete();
    }
}
