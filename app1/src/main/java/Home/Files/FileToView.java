package Home.Files;

import org.springframework.security.crypto.codec.Utf8;

import java.nio.charset.StandardCharsets;

public class FileToView {
int id;

    public byte[] getArray() {
        return array;
    }

    public void setArray(byte[] array) {
        this.array = array;
    }

    byte[] array;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    String title;
String content;
String message;
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setContent(String data) {

        this.content = data;
    }
}
