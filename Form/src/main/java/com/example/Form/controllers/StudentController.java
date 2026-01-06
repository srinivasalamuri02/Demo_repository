package com.example.Form.controllers;

import com.example.Form.model.Student;
import com.example.Form.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository repo;

    @PostMapping("/register")
    public Student registor(
                            @RequestParam String name,
                            @RequestParam String email,
                            @RequestParam Integer age){
        return repo.save(new Student(name,email,age));
    }


    @PostMapping
    public Student save(@RequestBody Student student) {

        return repo.save(student);
    }

    // READ
    @GetMapping
    public List<Student> getAll() {

        return repo.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Student update(@PathVariable Long id,
                          @RequestBody Student student) {
        student.setId(id);
        return repo.save(student);
    }

    //localhost:8080?id=1  this is for @Requestparam
    //localhost:8080/1      this is for @PathVariable

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        repo.deleteById(id);
    }
}
