module.exports = ({ name, patientId, wardId, sugar, cholesterol, RBC, FBS, HDL, LDL }) => {
   const today = new Date();
   return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                      
                         <tr>
                            <td>
                               <h1>Medical Report </h1>
                            </td>
                            <td class="title"><img  src="https://dcassetcdn.com/design_img/2553811/27442/27442_13647633_2553811_33fe9a47_image.jpg"
                               style="width:100%; max-width:156px;">
                            </td>
                            <td>
                               Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Patient name: ${name}
                            </td>
                            <td>
                               Patient number: ${patientId}
                            </td>
                            <td>
                               Ward number: ${wardId}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Medical Report:</td>
                   <td>Normal(%)</td>
                   <td>High (%)
                   <td>NO %</td>
                </tr>
                <tr class="item">
                   <td>Sugar:</td>
                   <td>177(98.9):</td>
                   <td>222(109.9)</td>
                   <td>${sugar}</td>
                </tr>
                <tr class="item">
                  <td>Cholesterol:</td>
                   <td>150(66.7):</td>
                   <td>199(98.2)</td>
                   <td>${cholesterol}</td>
                </tr>
                <tr class="item">
                  <td>RBC:</td>
                   <td>150(66.7):</td>
                   <td>199(98.2)</td>
                   <td>${RBC}</td>
                </tr>
                <tr class="item">
                  <td>FBS:</td>
                   <td>150(66.7):</td>
                   <td>199(98.2)</td>
                   <td>${FBS}</td>
                </tr>
                <tr class="item">
                  <td>HDL:</td>
                   <td>150(66.7):</td>
                   <td>199(98.2)</td>
                   <td>${HDL}</td>
                </tr>
                <tr class="item">
                  <td>LDL:</td>
                   <td>150(66.7):</td>
                   <td>199(98.2)</td>
                   <td>${LDL}</td>
                </tr>
             </table>
             <br />
             <h1 class="justify-center">JMH</h1>
          </div>
       </body>
    </html>
    `;
};