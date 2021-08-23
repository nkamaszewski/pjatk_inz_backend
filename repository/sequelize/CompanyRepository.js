// const Division = require('../../model/sequelize/Division');
const Company = require('../../model/sequelize/Company');

exports.getCompanys = () => {
    return Company.findAll();
};

exports.createCompany = (newCompanyData) => {
    return Company.create({
        Name: newCompanyData.Name,
        City: newCompanyData.City,
        PostalCode: newCompanyData.PostalCode,
        Street: newCompanyData.Street,
        Number: newCompanyData.Number,
        TIN: newCompanyData.TIN,
        Owner: newCompanyData.Owner
    });
};

exports.deleteCompany = (companyId) => {
    return Company.destroy({
        where: { IdCompany: companyId }
    });
};

exports.updateCompany = (companyId, data) => {
    const name = data.Name;
    const city = data.City;
    const postalCode = data.PostalCode;
    const street = data.Street;
    const number = data.Number;
    const TIN = data.TIN;
    const owner = data.Owner;


    return Company.update(data, { where: { IdCompany: companyId } });
}

exports.getCompanyById = (comId) => {
    return Company.findByPk(comId);
};

exports.getCompanyOwner = () => {
    return Company.findAll({
        where: {
            Owner: true
        }
    });
};