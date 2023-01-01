package Home.History;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/report")
public class HistoryControl {

@Autowired
    HistoryServer historyServer;


@PostMapping("getreport") public ArrayList<Report> getReport(@RequestBody int fileid)
{return historyServer.getReport(fileid);}

}
