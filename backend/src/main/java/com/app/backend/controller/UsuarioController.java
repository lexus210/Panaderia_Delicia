package com.app.backend.controller;

import com.app.backend.model.Usuario;
import com.app.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permitir peticiones desde el frontend (React)
class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Map<String, Object> response = new HashMap<>();

        return usuarioRepository.findByEmail(email).map(usuario -> {
            if (usuario.getPassword().equals(password)) {
                response.put("success", true);
                response.put("user", usuario);
            } else {
                response.put("success", false);
                response.put("message", "Contraseña incorrecta");
            }
            return response;
        }).orElseGet(() -> {
            response.put("success", false);
            response.put("message", "Usuario no encontrado");
            return response;
        });
    }
}
