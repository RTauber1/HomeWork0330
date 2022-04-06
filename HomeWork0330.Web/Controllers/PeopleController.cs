using HomeWork0330.Data;
using HomeWork0330.Web;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeWork0330.Web.Controllers
{
    public class PeopleController : Controller
    {

        private string _connectionString =
            @"Data Source=.\sqlexpress;Initial Catalog=ALlMyProjects;Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAll()
        {
            DataBase dataBase = new DataBase(_connectionString);
            List<Person> people = dataBase.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            DataBase dataBase = new DataBase(_connectionString);
            dataBase.AddPerson(person);
            return Json(person);
        }
        [HttpPost]
        public void Delete(int id)
        {
            DataBase dataBase = new DataBase(_connectionString);
            dataBase.Delete(id);
        }
        [HttpPost]
        public void EditPerson(int id, string firstName, string lastName, int age)
        {
            DataBase dataBase = new DataBase(_connectionString);
            dataBase.EditPerson(id, firstName, lastName, age);
        }
    }
}
