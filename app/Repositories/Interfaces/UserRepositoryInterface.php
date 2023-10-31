<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface
{
    public function createUpdate($params);
    public function getAll();
    public function find($id);
    public function delete($id);
}
