package br.ufpr.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public void enviarSenhaAutocadastro(String para, String nome, String senha) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(remetente);
        msg.setTo(para);
        msg.setSubject("TechnoChip - Sua senha de acesso");
        msg.setText(
            "Olá, " + nome + "!\n\n" +
            "Seu cadastro no sistema de manutenção da TechnoChip foi realizado com sucesso.\n\n" +
            "Login: " + para + "\n" +
            "Senha: " + senha + "\n\n" +
            "Use esses dados para entrar no sistema.\n\n" +
            "Equipe TechnoChip"
        );
        mailSender.send(msg);
    }
}