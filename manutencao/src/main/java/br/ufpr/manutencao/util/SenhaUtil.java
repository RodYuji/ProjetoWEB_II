package br.ufpr.manutencao.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;

import br.ufpr.manutencao.model.Usuario;

public class SenhaUtil {

    private static final SecureRandom RANDOM = new SecureRandom();

    public static String gerarSalt() {
        byte[] bytes = new byte[16];
        RANDOM.nextBytes(bytes);
        return Base64.getEncoder().encodeToString(bytes);
    }

    public static String hash(String senha, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] resultado = md.digest((senha + salt).getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(resultado);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 nao disponivel", e);
        }
    }

    public static void definirSenha(Usuario usuario, String senhaPura) {
        String salt = gerarSalt();
        usuario.setSalt(salt);
        usuario.setSenha(hash(senhaPura, salt));
    }

    public static boolean conferir(Usuario usuario, String senhaDigitada) {
        if (usuario.getSalt() == null || usuario.getSenha() == null || senhaDigitada == null)
            return false;
        String calculado = hash(senhaDigitada, usuario.getSalt());
        return MessageDigest.isEqual(
                calculado.getBytes(StandardCharsets.UTF_8),
                usuario.getSenha().getBytes(StandardCharsets.UTF_8));
    }
}
