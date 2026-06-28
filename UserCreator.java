import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserCreator {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String rawPassword = "minhaSenha123";
        String hashedPassword = encoder.encode(rawPassword);

        System.out.println("Senha criptografada: " + hashedPassword);

        
    }
}
