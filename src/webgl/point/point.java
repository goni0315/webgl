package webgl.point;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class point {
	
	@SuppressWarnings("resource")
	public static void main(String[] args) throws IOException {
		
		String MyFile = "C:\\Users\\goni\\Desktop\\testPolygon.geojson";

		 // Creates a new File instance by converting the given pathname string into an abstract pathname.
		 File file = new File(MyFile);

		 if (!file.exists()) {
		 }

		 FileReader readFile = new FileReader(file); // 
		 String fileString = ""; // 파일 안 내용을 담을 String 변수

		 do {
		    int tempChar = readFile.read();

		    if (tempChar == -1) // 파일 끝에 도달하면 -1을 리턴
		      break;

		    fileString = fileString + (char)tempChar;

		 }while(true);
		 
		 System.out.println(fileString);
		 
		 
		 Gson gson = new Gson();
		 JsonObject toJsonObject = gson.toJson(fileString);
		
		JsonParser jsonParser = new JsonParser();
		JsonObject object = (JsonObject) jsonParser.parse(toJsonObject);
		System.out.println(object.get("type"));
		
		
		
		 
	}

}
