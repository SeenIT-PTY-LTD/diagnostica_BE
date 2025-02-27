const MedDataModel = require("../model/meddata_model");

class MedDataServices{
    static async registerMeddata(email,occupation,mobile,Hphone,ECP,Relationship,ECPh,MCN,MCNId,PHC,HealthF,Memberno,hcc,exp,DVDno,about_us,ReferDN,ReferDC,RDnphone,RGPn,RGPc,RGPnphone,physioN,physioP,physioC,claimN,DOI,Yw_cn,Addwp,cpwp,CPsur,CPph,InCP,InCA,InCCM,InCSur,InCPh,CmEA,Info_accuracy,perRelease,perXray,age,gender,height,Weight,bmi,blood_thinners,herbal_medication,pain_medication,drink_alcohol,drinks_per_day,allergies_to_drugs,allergic_reaction,what_else,claustrophobia,pacemaker,any_metal_in_body,surgery,PorthopaedicS,Complications_AS,Osteoarthritis,Rheumatoid_Arthritis,Tmedi,Hyper_active,Hypo_active,Heart_Attack,HBP,LBP,other,Hepatitis_B,Hepatitis_C,Stroke,Past_Blood,HIV,Kidney,Gastric,Indigestion,Ulcers,Venous,DVT,Varicose,joint,Asthma,Emphysema,Sleep_Apnoea,Pulmonary,smoker,Breast,Mastectomy,Shoulder,Management){
        try{
            const createMedData = new MedDataModel({email,occupation,mobile,Hphone,ECP,Relationship,ECPh,MCN,MCNId,PHC,HealthF,Memberno,hcc,exp,DVDno,about_us,ReferDN,ReferDC,RDnphone,RGPn,RGPc,RGPnphone,physioN,physioP,physioC,claimN,DOI,Yw_cn,Addwp,cpwp,CPsur,CPph,InCP,InCA,InCCM,InCSur,InCPh,CmEA,Info_accuracy,perRelease,perXray,age,gender,height,Weight,bmi,blood_thinners,herbal_medication,pain_medication,drink_alcohol,drinks_per_day,allergies_to_drugs,allergic_reaction,what_else,claustrophobia,pacemaker,any_metal_in_body,surgery,PorthopaedicS,Complications_AS,Osteoarthritis,Rheumatoid_Arthritis,Tmedi,Hyper_active,Hypo_active,Heart_Attack,HBP,LBP,other,Hepatitis_B,Hepatitis_C,Stroke,Past_Blood,HIV,Kidney,Gastric,Indigestion,Ulcers,Venous,DVT,Varicose,joint,Asthma,Emphysema,Sleep_Apnoea,Pulmonary,smoker,Breast,Mastectomy,Shoulder,Management});
            return await createMedData.save();
        }catch(err){
            throw err;
        }
    }

    static async update(
        email,occupation,
        mobile,Hphone,
        ECP,Relationship,
        ECPh,MCN,
        MCNId,PHC,
        HealthF,Memberno,
        hcc,exp,
        DVDno,about_us,
        ReferDN,ReferDC,
        RDnphone,RGPn,
        RGPc,RGPnphone,
        physioN,physioP,
        physioC,claimN,
        DOI,Yw_cn,
        Addwp,cpwp,
        CPsur,CPph,
        InCP,InCA,
        InCCM,InCSur,
        InCPh,CmEA,
        Info_accuracy,perRelease,
        perXray,age,
        gender,height,
        Weight,bmi,
        blood_thinners,herbal_medication,
        pain_medication,drink_alcohol,
        drinks_per_day,allergies_to_drugs,
        allergic_reaction,what_else,
        claustrophobia,pacemaker,
        any_metal_in_body,surgery,
        PorthopaedicS,Complications_AS,
        Osteoarthritis,Rheumatoid_Arthritis,
        Tmedi,Hyper_active,
        Hypo_active,Heart_Attack,
        HBP,LBP,
        other,Hepatitis_B,
        Hepatitis_C,Stroke,
        Past_Blood,
        HIV,Kidney,
        Gastric,Indigestion,
        Ulcers,Venous,
        DVT,Varicose,
        joint,Asthma,
        Emphysema,Sleep_Apnoea,
        Pulmonary,smoker,
        Breast,Mastectomy,
        Shoulder,Management) {
        try {
            var query = { email: email };
            var values = { $set: { occupation:occupation,mobile:mobile,Hphone:Hphone,ECP:ECP,Relationship:Relationship,ECPh:ECPh,MCN:MCN,MCNId:MCNId,PHC:PHC,HealthF:HealthF,Memberno:Memberno,hcc:hcc,exp:exp,DVDno:DVDno,about_us:about_us,ReferDN:ReferDN,ReferDC:ReferDC,RDnphone:RDnphone,RGPn:RGPn,RGPc:RGPc,RGPnphone:RDnphone,physioN:physioN,physioP:physioP,physioC:physioC,claimN:claimN,DOI:DOI,Yw_cn:Yw_cn,Addwp:Addwp,cpwp:cpwp,CPsur:CPsur,CPph:CPph,InCP:InCP,InCA:InCA,InCCM:InCCM,InCSur:InCSur,InCPh:InCPh,CmEA:CmEA,Info_accuracy:Info_accuracy,perRelease:perRelease,perXray:perXray,age:age,gender:gender,height:height,Weight:Weight,bmi:bmi,blood_thinners:blood_thinners,herbal_medication:herbal_medication,pain_medication:pain_medication,drink_alcohol:drink_alcohol,drinks_per_day:drinks_per_day,allergies_to_drugs:allergies_to_drugs,allergic_reaction:allergic_reaction,what_else:what_else,claustrophobia:claustrophobia,pacemaker:pacemaker,any_metal_in_body:any_metal_in_body,surgery:surgery,PorthopaedicS:PorthopaedicS,Complications_AS:Complications_AS,Osteoarthritis:Osteoarthritis,Rheumatoid_Arthritis:Rheumatoid_Arthritis,Tmedi:Tmedi,Hyper_active:Hyper_active,Hypo_active:Hypo_active,Heart_Attack:Heart_Attack,HBP:HBP,LBP:LBP,other:other,Hepatitis_B:Hepatitis_B,Hepatitis_C:Hepatitis_C,Stroke:Stroke,Past_Blood:Past_Blood,HIV:HIV,Kidney:Kidney,Gastric:Gastric,Indigestion:Indigestion,Ulcers:Ulcers,Venous:Venous,DVT:DVT,Varicose:Varicose,joint:joint,Asthma:Asthma,Emphysema:Emphysema,Sleep_Apnoea:Sleep_Apnoea,Pulmonary:Pulmonary,smoker:smoker,Breast:Breast,Mastectomy:Mastectomy,Shoulder:Shoulder,Management:Management} };

            return await MedDataModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

    static async getmeddata(email){
        try {
            
            return await MedDataModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    static async deletemeddata(email){
        try{
            var query = {email : email};
            return await MedDataModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }
}
module.exports = MedDataServices;