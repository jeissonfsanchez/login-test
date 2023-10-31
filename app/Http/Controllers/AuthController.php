<?php
namespace App\Http\Controllers;

use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
class AuthController extends Controller
{
    use ApiResponse;

    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository){
        $this->userRepository = $userRepository;
        $this->middleware(
            'auth:api', ['except' => ['login','register']]
        );
    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $data = $request->valid();

        $response = $this->userRespository->createUpdate($data);

        if ($response) {
            return $this->successResponse([
                'data' => 'Usuario registrado exitosamente',
                'status' => 201
            ]);
        }else{
            return $this->errorResponse([
                'data' => 'Error almacenando la información'
            ]);
        }
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return $this->errorResponse([
                'data' => $validator->errors()
            ]);
        }
        $credentials = $request->only(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return $this->errorResponse([
                'data' => 'Usuario no autorizado'
            ]);
        }
        return $this->successResponse([
            'data' => [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
            ]
        ]);
    }

    public function logout(){
        auth()->logout();
        return $this->successResponse([
            'data' => 'Sesión cerrada correctamente'
        ]);
    }

    public function refresh(){
        return $this->respondWithToken(auth()->refresh());
    }
}
