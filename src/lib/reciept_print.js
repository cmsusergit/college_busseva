import pdfMake from "pdfmake/build/pdfmake"
import 'pdfmake/build/vfs_fonts'

import pb from '$lib/db.js'
import _ from 'lodash'

export const receipt_print=async (id)=>{            
    const record = await pb.collection('bus_fees').getOne(id, {
        expand: 'academic_year,bus_point,course,department,route,route.city,route.traveller',
    });
    const ayear=record.expand.academic_year
    const route=record.expand.route

    const course=record.expand.course
    const buspoint=record.expand.bus_point
    const department=record.expand.department
    const traveller=route.expand.traveller
    const imageurl=pb.files.getUrl(record,record.photo)
    const reportHeading={
        margin:[2,2,2,2],bold:true,
        alignment:'center',
        text:traveller.name,
        fontSize:14,
        decoration:'underline'
    }            
    const reportHeading1={
        margin:[2,2,2,2],fontSize:11,
        alignment:'center',
        text:`${traveller.contact_person}(${traveller.contact_number})`
    }
    const content1={
        margin:[2,10,2,10],
        columns:[
            {text:`Receipt Number: ${record.receipt_number}\nDate: ${new Date().toLocaleString('en-IN',{day:"numeric",month:"numeric",year:"numeric"})}`,alignment:'left',width:'*'},
            {table:{body:[[{image:'photo',height:80,width:100,border:[true,true,true,true]}]]},width:'auto'}
        ]
    }
    const currencyFormat = Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumSignificantDigits: 5,
    });
    const contentText={
        margin:[2,10,2,10],lineHeight:1.5,
        alignment:'justify',
        fontSize:11,
        text:[            
            'Received ',{text:`${currencyFormat.format(record.amount_paid)}`,bold:true,fontSize:11,decoration:'underline'}, 
            ` Cash/Online\nFrom, `,{text:` ${record.stu_name} (${record.enrollment_number})\n`,bold:true},

            {text:'Contact Number:  ',bold:true},`${record.stu_contact_number}  `,{text:'Email:  ',bold:true},`${record.stu_email}\n`,
            {text:'Course:  ',bold:true},`${course.name} (${course.alias})\n`,
            {text:'Department:  ',bold:true},`${department.name} (${department.alias}) \nOn `,
            {text:`${new Date(record.payment_date).toLocaleString('en-IN',{day:"numeric",month:"long",year:"numeric"})}`,bold:true},
            ' for the period of ',
            {text:`${new Date(ayear.duration_from).toLocaleString('en-IN',{day:"numeric",month:"numeric",year:"numeric"})}`,fontSize:11,bold:true,decoration:'underline'}, 
            ' to ',{text:`${new Date(ayear.duration_to).toLocaleString('en-IN',{day:"numeric",month:"numeric",year:"numeric"})}`,fontSize:11,bold:true,decoration:'underline'}
    ]}
    const contentText1={
        margin:[2,5,2,5],lineHeight:1.5,
        alignment:'justify',
        fontSize:11,
        text:[            
            {text:'Transportation Details:\n',fontSize:11,bold:true,decoration:'underline'},
            {text:'Origin City: ',bold:true},` ${route.expand.city.name}`,
            {text:'  Route Name: ',bold:true},` ${route.name}`,
            {text:'  Pickup/Drop Point: ',bold:true},` ${buspoint.name}(${buspoint.alias})`
        ]}

        const footText='*This is a computer generated document , hence no signature is required'
    let reportDefination=[        
        {
			text: "Receipt for Payment of Transport Contractor's Fare",
            fontSize:17,
            alignment:'center',
            bold:true
		},
        reportHeading,
        reportHeading1,
        content1,
        contentText,
        contentText1,

        {margin:[2,2,2,2],fontSize:'10',alignment:'left',text:footText,color:'red'}, 
    ]   

    let reportDefination1=JSON.parse(JSON.stringify(reportDefination))
    pdfMake.fonts = {
        Courier: {
            normal: 'Courier',
            bold: 'Courier-Bold',
            italics: 'Courier-Oblique',
            bolditalics: 'Courier-BoldOblique'
        },
        Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',

            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        },
    }
    pdfMake.createPdf({        
        content:[
            reportDefination,            {
                margin:[0,10,0,10],alignment:'center',
                bold:true,text:'----------------------------------------------------------------------------------------------------'
            },
            reportDefination1],
        pageOrientation: 'portrait',
        pageSize: 'A4',


        images:{photo:{url:imageurl}},
    })
    .open()
}