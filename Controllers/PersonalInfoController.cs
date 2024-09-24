using ExcelCRUDAPI.Models;
using ExcelCRUDAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ExcelCRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonalInfoController : ControllerBase
    {
        private readonly ExcelService _excelService;

        public PersonalInfoController(ExcelService excelService)
        {
            _excelService = excelService;
        }

        [HttpGet]
        public ActionResult<List<PersonalInfo>> Get()
        {
            return _excelService.ReadExcelData();
        }

        [HttpPost]
        public IActionResult Post([FromBody] PersonalInfo info)
        {
            _excelService.AddExcelData(info);
            return Ok();
        }

        [HttpPut]
        public IActionResult Put([FromBody] PersonalInfo info)
        {
            _excelService.UpdateExcelData(info);
            return Ok();
        }

        [HttpDelete("{aadharCardNumber}")]
        public IActionResult Delete(string aadharCardNumber)
        {
            _excelService.DeleteExcelData(aadharCardNumber);
            return Ok();
        }
    }
}
