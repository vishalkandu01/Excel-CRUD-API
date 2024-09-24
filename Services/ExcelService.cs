using ExcelCRUDAPI.Models;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;

namespace ExcelCRUDAPI.Services
{
    public class ExcelService
    {
        private readonly string _excelFilePath;

        public ExcelService(IConfiguration configuration)
        {
            _excelFilePath = configuration["ExcelFilePath"];
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
        }

        public List<PersonalInfo> ReadExcelData()
        {
            List<PersonalInfo> data = new List<PersonalInfo>();
            using (var package = new ExcelPackage(new FileInfo(_excelFilePath)))
            {
                var worksheet = package.Workbook.Worksheets[0];
                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    DateTime? dateOfBirth = null;
                    if (DateTime.TryParse(worksheet.Cells[row, 2].Value?.ToString(), out DateTime parsedDate))
                    {
                        dateOfBirth = parsedDate;
                    }

                    data.Add(new PersonalInfo
                    {
                        Name = worksheet.Cells[row, 1].Value?.ToString(),
                        DateOfBirth = dateOfBirth,
                        ResidentialAddress = worksheet.Cells[row, 3].Value?.ToString(),
                        PermanentAddress = worksheet.Cells[row, 4].Value?.ToString(),
                        PhoneNumber = worksheet.Cells[row, 5].Value?.ToString(),
                        EmailAddress = worksheet.Cells[row, 6].Value?.ToString(),
                        MaritalStatus = worksheet.Cells[row, 7].Value?.ToString(),
                        Gender = worksheet.Cells[row, 8].Value?.ToString(),
                        Occupation = worksheet.Cells[row, 9].Value?.ToString(),
                        AadharCardNumber = worksheet.Cells[row, 10].Value?.ToString(),
                        PANNumber = worksheet.Cells[row, 11].Value?.ToString()
                    });
                }
            }
            return data;
        }

        /*
        public void WriteExcelData(List<PersonalInfo> data)
        {
            using (var package = new ExcelPackage(new FileInfo(_excelFilePath)))
            {
                var worksheet = package.Workbook.Worksheets[0];
                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    worksheet.Cells[row, 1].Value = data[row - 2].Name;
                    worksheet.Cells[row, 2].Value = data[row - 2].DateOfBirth;
                    worksheet.Cells[row, 3].Value = data[row - 2].ResidentialAddress;
                    worksheet.Cells[row, 4].Value = data[row - 2].PermanentAddress;
                    worksheet.Cells[row, 5].Value = data[row - 2].PhoneNumber;
                    worksheet.Cells[row, 6].Value = data[row - 2].EmailAddress;
                    worksheet.Cells[row, 7].Value = data[row - 2].MaritalStatus;
                    worksheet.Cells[row, 8].Value = data[row - 2].Gender;
                    worksheet.Cells[row, 9].Value = data[row - 2].Occupation;
                    worksheet.Cells[row, 10].Value = data[row - 2].AadharCardNumber;
                    worksheet.Cells[row, 11].Value = data[row - 2].PANNumber;
                }

                package.Save();
            }
        }
        */

        public void WriteExcelData(List<PersonalInfo> data)
        {
            using (var package = new ExcelPackage(new FileInfo(_excelFilePath)))
            {
                var worksheet = package.Workbook.Worksheets[0];

                // Clear existing data in the worksheet
                worksheet.Cells.Clear();

                // Write headers if necessary
                worksheet.Cells[1, 1].Value = "Name";
                worksheet.Cells[1, 2].Value = "DateOfBirth";
                worksheet.Cells[1, 3].Value = "ResidentialAddress";
                worksheet.Cells[1, 4].Value = "PermanentAddress";
                worksheet.Cells[1, 5].Value = "PhoneNumber";
                worksheet.Cells[1, 6].Value = "EmailAddress";
                worksheet.Cells[1, 7].Value = "MaritalStatus";
                worksheet.Cells[1, 8].Value = "Gender";
                worksheet.Cells[1, 9].Value = "Occupation";
                worksheet.Cells[1, 10].Value = "AadharCardNumber";
                worksheet.Cells[1, 11].Value = "PANNumber";

                // Write data
                for (int row = 0; row < data.Count; row++)
                {
                    worksheet.Cells[row + 2, 1].Value = data[row].Name;
                    worksheet.Cells[row + 2, 2].Value = data[row].DateOfBirth;
                    worksheet.Cells[row + 2, 3].Value = data[row].ResidentialAddress;
                    worksheet.Cells[row + 2, 4].Value = data[row].PermanentAddress;
                    worksheet.Cells[row + 2, 5].Value = data[row].PhoneNumber;
                    worksheet.Cells[row + 2, 6].Value = data[row].EmailAddress;
                    worksheet.Cells[row + 2, 7].Value = data[row].MaritalStatus;
                    worksheet.Cells[row + 2, 8].Value = data[row].Gender;
                    worksheet.Cells[row + 2, 9].Value = data[row].Occupation;
                    worksheet.Cells[row + 2, 10].Value = data[row].AadharCardNumber;
                    worksheet.Cells[row + 2, 11].Value = data[row].PANNumber;
                }

                package.Save();
            }
        }


        public void AddExcelData(PersonalInfo info)
        {
            var data = ReadExcelData();
            data.Add(info);
            WriteExcelData(data);
        }

        public void UpdateExcelData(PersonalInfo info)
        {
            var data = ReadExcelData();
            var index = data.FindIndex(x => x.AadharCardNumber == info.AadharCardNumber);
            if (index != -1)
            {
                data[index] = info;
                WriteExcelData(data);
            }
        }

        public void DeleteExcelData(string aadharCardNumber)
        {
            var data = ReadExcelData();
            var item = data.Find(x => x.AadharCardNumber == aadharCardNumber);
            if (item != null)
            {
                data.Remove(item);
                WriteExcelData(data);
            }
        }
    }
}
