<script> 
    import pb from '$lib/db.js'

    import { Input,Alert,Button,P,Img,Radio,Spinner,Select, Label } from 'flowbite-svelte'    
    import { env } from '$env/dynamic/public'
    import { onMount } from 'svelte'
    import {invalidateAll,goto} from '$app/navigation'
    import _ from 'lodash'    
    import {receipt_print} from '$lib/reciept_print.js'
    let loading_dept=false,loading=false
    export let data
    let selectedRouteRecord,orderPlaced

    let isRecordExist=false
    let formData = new FormData()
    let is_submitted=false
    const initialFormValue={
      "order_id": 0,
      "route": 0,
      "enrollment_number": "",      
      "stu_name": "",
      "stu_email":'',
      "stu_contact_number": "",
      "parent_contact_number": "",
      "bus_point": '',
      "course": '',
      "department": '',
      "sem": '',
      "transaction_id":"",
      "amount_paid": 0.0,
      "amount_total": 0.0,
      "payment_status":false,
      "payment_date": new Date(),      
      "payment_type":data?.profile?"CASH":"ONLINE",
      "academic_year": data?.ayearList?.find(ob=>ob.is_active==true)?.id??0,
      "user": data?.profile?.id??''
    }
    let semList=[1,2,3,4,5,6,7,8,9,10],departmentList=[]
    let mesg,error_mesg
    let feesRecord=initialFormValue
    const fetchDepartmentList=async(value)=>{
      try{
            if(value==''){
              departmentList=[]
              return
            }
            loading_dept=true
            feesRecord.amount_total=data?.routePaymentList?.find(ob=>ob.course==value).amount_total
            const query=`course='${value}'`
            departmentList = await pb.collection('department').getFullList({sort: 'name',filter:query})
        }
        catch(error){
            console.log(error)        
        }
        finally{
          feesRecord.bus_point=''
          loading_dept=false
        }      
    }
    const fetchRecordWithEmail=async()=>{
      try{
        const record = await pb.collection('bus_fees').getFirstListItem(`stu_email="${feesRecord.stu_email}"`)
        if(record){
          isRecordExist=true
          fetchDepartmentList(record.course)
          feesRecord=JSON.parse(JSON.stringify(record))
        }
      }catch(error1){
        console.log('****',error1)
        isRecordExist=false
      }
    }
    onMount(async()=>{      
      feesRecord=initialFormValue
    })

    const onRouteSelected=async(dt)=>{
      if(!dt)return
      console.log('----',dt)
      if(!feesRecord?.course){
        alert("Please Select Course To Proceed")
        error_mesg=''
        return
      }
      const curr_slot=data?.courseList?.find(ob=>ob.id==feesRecord.course).slot
      try{
        const query1=`bus_point='${dt}'`
        const temp1=await pb.collection('route_bus_point').getFullList({filter:query1,expand:'route,route.traveller'})        
        selectedRouteRecord=''
        temp1.forEach(ob => {
          const rr=ob?.expand?.route
          if(rr && rr.slot==curr_slot){
            selectedRouteRecord=rr
          }         
        });
        feesRecord.route=selectedRouteRecord.id
      }catch(error){
        console.log('****',error)
        feesRecord.bus_point=''
      }
    }
  const onsubmit=async()=>{
    feesRecord.amount_paid=feesRecord.amount_total
    try{
      let record
      if(!isRecordExist){
        loading=true
        const receipt_record = await pb.collection('receipt_number').getFirstListItem(`academic_year="${feesRecord.academic_year}"`)        
        feesRecord.receipt_number=new Date().getFullYear()+'_'+receipt_record.number.toString().padStart(5, '0')
        feesRecord.payment_date=new Date().toISOString()
        _.forEach(feesRecord,(value,name)=>{

          
          if(name=='stu_name'){
            formData.append(name,value.toUpperCase())
          }
          if(name!='photo')
            formData.append(name,value)
        })
        record = await pb.collection('bus_fees').create(formData)
        console.log('----',record)
        if(record && feesRecord.payment_type=='ONLINE'){
          orderPlaced={
            receipt:feesRecord?.id,
            amount:feesRecord?.amount_paid,
          }
          loading=false
          return
        }
        else{
          feesRecord.id=record.id
          console.log('----',record.id)
          await pb.collection('bus_fees').update(feesRecord.id,{payment_status:true})
          await pb.collection('receipt_number').update(receipt_record.id,{number:receipt_record.number+1});
          is_submitted=true
          goto('/')
        }
      }
    }catch(error1){      
      console.log('****',error1)      
      error_mesg=error1.message    
    }
    finally{
      loading=false
    }
  }
  const doPayment=async()=>{
    loading=true
        try{
          const requestRecord={
            merchant_id:env.PUBLIC_MID,
            order_id:feesRecord.id,            
            amount: feesRecord.amount_paid,
            currency:'INR',
            redirect_url:'http://college-busseva.vercel.app/api/ccAvenueResponse',
            cancel_url:'https://college-busseva.vercel.app/api/ccAvenueResponse',
            language:'EN',            
            billing_name:feesRecord.stu_name,
            billing_address:'Vasad',
            billing_city:'Vasad',
            billing_state:'Gujrat',            
            billing_zip:'388306',
            billing_country:'India',
            billing_tel:feesRecord.stu_contact_number,
            billing_email:feesRecord.stu_email            
          }
          fetch('/api/payment', {
              method: 'POST',
              body: JSON.stringify(requestRecord),
              headers: {
                  'content-type': 'application/json'
              }
          }).then(async(rr)=>{
              const tt=await rr.text()
              goto(tt)
          })          // orderPlaced=await dt.json()
          // if(orderPlaced?.error)
          // {
          //   error_mesg=orderPlaced.error.description
          //   orderPlaced=null
          // }
          // else{

          //   console.log(id,orderPlaced.id)
          //   feesRecord.order_id=orderPlaced.id
          //   const record1=await pb.collection('bus_fees').update(id,{order_id:orderPlaced.id})
          //   console.log('----',record1)
          //   mesg="Payment Initiated"
          // }
        }catch(error1){
          console.log('****',error1)             
          error_mesg=error1
          orderPlaced=null
        }
        finally{
          loading=false
        }
}
const onFileChange=async()=>{  
    for (let file of fileInput.files) {
      feesRecord.photo=file.name
      const reader = new FileReader();

      if(file.size>=2097152){
        error_mesg='Photo Size must be less then 2MB'
        window.scrollTo(0,0)
        return
      }
      reader.addEventListener("load", function () {        
        feesRecord.photo=reader.result
      });
      reader.readAsDataURL(file);
      formData.append('photo', file)
    }  
}


const generateReceipt=async()=>{  
  console.log('----',feesRecord)
  receipt_print(feesRecord.id)
}
</script>

{#if data?.status=='error'}
  <Alert dismissable>{data?.error}</Alert>
{/if}
{#if error_mesg}
  <Alert on:close={()=>{error_mesg=''}} dismissable>{error_mesg}</Alert>
{/if}
{#if isRecordExist} 
  <div>
  <P class="bg-orange-700 text-white p-2 text-center font-bold">Record Alreay Exists With Email: <b>{feesRecord.stu_email}</b></P>
  <div class="m-4 text-center">
    <P class="text-center font-bold">Name: {feesRecord?.stu_name}</P>
    <P class="text-center font-bold">Contact: {feesRecord?.stu_contact_number}</P>
    <P class="text-center font-bold">Email: {feesRecord?.stu_email}</P>
  {#if feesRecord.payment_status==true}
    <P class="bg-slate-500 text-white p-2 text-center my-2 font-bold">Payment Already Done</P>
  {/if}
  <div class="my-4 p-2 border-t font-bold">
    {#if feesRecord.payment_status==true}
      <Button on:click={generateReceipt} color="blue">Receipt</Button>
    {:else}
      <Button on:click={()=>{doPayment();isRecordExist=false;}} color="blue">Proceed To Payment</Button>
    {/if}
    <Button on:click={()=>{isRecordExist=false;feesRecord=initialFormValue;}} >Close</Button>
    </div> 
  </div>
</div>
{:else if orderPlaced}
  <div class="m-4 p-4 text-center font-bold">
    <P class="text-center font-bold">Name: {feesRecord?.stu_name}</P>
    <P class="text-center font-bold">Contact: {feesRecord?.stu_contact_number}</P>
    <P class="text-center font-bold">Email: {feesRecord?.stu_email}</P>
    <P class="text-center font-bold">Payment Receipt Number: {orderPlaced?.receipt}</P>
    <P class="pb-4 mb-4 text-center font-bold border-b">Payment Amount: {orderPlaced?.amount/100.0} {orderPlaced?.currency}</P>
    <Button on:click={doPayment} color="green" class="mr-2">Proceed To Payment</Button>
    <Button on:click={()=>{orderPlaced=null;invalidateAll();}} color="red">Cancel</Button>
  </div>
{:else}
  {#if is_submitted}
    <div>
      <P class="text-2xl font-bold text-center p-2">Form is Submitted Successfully</P>
      <div class="flex justify-center">
        <Button on:click={generateReceipt} class="m-2 p-2" color="blue">Print Receipt</Button>
      </div>
    </div>
  {:else}
    <form on:submit|preventDefault={onsubmit} class="m-4 md:m-2">
        <div class="mb-2">
          <Label for="academic_year" class="mb-2 text-lg">
            Academic Year<span class="ml-1 text-orange-700">*</span></Label>
            <Select bind:value={feesRecord.academic_year} disabled>
              {#each data?.ayearList as record}
                <option value={record.id}>{record.name}</option>
              {/each}
            </Select>

          </div> 
        <div>
          <Label class="mb-2 text-lg" for="stu_email">Student Email<span class="ml-1 text-orange-700">*</span></Label>
          <Input on:blur={fetchRecordWithEmail} bind:value={feesRecord.stu_email} type="email" id="stu_email" name="stu_email" required/>      
        </div>
        <div class="grid gap-4 mb-4 md:grid-cols-2">
          <div>        
            <Label for="enrollment_number" class="mb-2 text-lg">Enrollment/College ID/Form Number<span class="ml-1 text-orange-700">*</span></Label>
            <Input bind:value={feesRecord.enrollment_number} type="text" id="enrollment_number" name="enrollment_number" required />
          </div>
          <div>
            <Label for="enrollment_number" class="mb-2 text-lg">Student Name<span class="ml-1 text-orange-700">*</span></Label>            
            <Input on:change={(ee)=>ee.target.value=ee.target.value.toUpperCase()} bind:value={feesRecord.stu_name} type="text" id="stu_name" name="stu_name" required />
          </div>
        </div>
        <div class="grid gap-4 mb-4 md:grid-cols-{2}">
          <div>
            <Label class="mb-2 text-lg" for="stu_contact_number">Student Contact<span class="ml-1 text-orange-700">*</span></Label>
            <Input bind:value={feesRecord.stu_contact_number} type="text" id="stu_contact_number" name="stu_contact_number" required/>
          </div>
          <div>          
            <Label class="mb-2 text-lg" for="parent_contact_number">Parent Contact<span class="ml-1 text-orange-700">*</span></Label>
            <Input bind:value={feesRecord.parent_contact_number} type="text" id="parent_contact_number" name="parent_contact_number" required/>
          </div>    
        </div> 
        <div>
          {#if feesRecord?.photo}
            <img class="w-48 h-48" src={feesRecord.photo} alt=""/>
          {/if}
          <Label class="mb-2 text-lg" for="fileInput">Photo<span class="ml-1 text-orange-700">* (size must be less then 2MB)</span></Label>
          <Input on:change={onFileChange} src={feesRecord.photo} type="file" id="fileInput" required></Input>
        </div>
        <div class="grid gap-4 mb-4 md:grid-cols-{2+1}">
          <div>
              <Label class="mb-2 text-lg" for="course">Course
                <span class="ml-1 text-orange-700">*
                  {#if loading_dept}
                    <Spinner></Spinner>
                  {/if}
                </span> 
              </Label>
              <Select on:change={(event)=>fetchDepartmentList(event.target.value)} bind:value={feesRecord.course} id="course" required>
                {#each data?.courseList as course}          
                  <option value={course.id} >{course.name}</option>
                {/each}
              </Select>   
          </div>
          <div>
            <Label class="mb-2 text-lg" for="department">Department<span class="ml-1 text-orange-700">*</span></Label>
              <Select bind:value={feesRecord.department} id="department" required>
                {#each departmentList as department}          
                  <option value={department.id} >{department.name}</option>
                {/each}
              </Select>  
          </div>
          <div>
            <Label class="mb-2 text-lg" for="sem">Semester<span class="ml-1 text-orange-700">*</span></Label>
              <Select bind:value={feesRecord.sem} id="sem" required>
                {#each semList as sem}          
                  <option value={sem}>{sem}</option>
                {/each}
              </Select> 
          </div>
        </div>
        <div class="grid gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label class="mb-2 text-lg" for="city">City<span class="ml-1 text-orange-700">*</span></Label>
            <Select id="city" required>
              {#each data?.cityList as city}          
                <option value={city.id}>{city.name}</option>
              {/each}
            </Select>  
          </div>    
          <div>
            <Label class="mb-2 text-lg" for="buspoint">Bus Pickup Point<span class="ml-1 text-orange-700">*</span></Label>                
            <Select on:change={event=>onRouteSelected(event.target.value)}  bind:value={feesRecord.bus_point} id="bus_point" required>
              {#each data?.buspointList as bus_point}          
                <option value={bus_point.id}>{bus_point.name}</option>
              {/each}
            </Select>  
          </div>     
        </div>
        {#if feesRecord.bus_point}
          {#if selectedRouteRecord}
            <div class="w-full mb-2 p-2 border rounded bg-blue-500 text-white">
              <b>Traveller Name:</b> {selectedRouteRecord?.expand?.traveller?.name}<br/>
              <b>Traveller Contact:</b> { selectedRouteRecord?.expand?.traveller?.contact_person} ({selectedRouteRecord?.expand?.traveller?.contact_number})<br/>
              <b>Route:</b> {selectedRouteRecord?.name} ({selectedRouteRecord?.code})              
            </div>                    
          {:else}
            <div class="w-full mb-2 p-2 border rounded bg-orange-700 text-white">
                Route Not Allocated for Selected Pickup Point
            </div>
          {/if}
        {/if}
        <div class="mb-2 grid gap-5 grid-cols-{data?.profile?2:1}">
          <div>
            <Label class="mb-2 text-lg">Payement Amount</Label>
            <Input bind:value={feesRecord.amount_total} disabled></Input>

          </div>
          {#if data?.profile}
            <div>
              <Label class="mb-2 text-lg">Payment Method</Label>
              <div class="grid grid-cols-{2+1} w-full md:w-full">
                <Radio bind:group={feesRecord.payment_type} color="blue" name="payment_type" value="CASH" class="w-full p-4">CASH</Radio>
                <Radio bind:group={feesRecord.payment_type} color="blue" name="payment_type" value="QRCODE" class="w-full p-4">QR Code</Radio>
                <Radio bind:group={feesRecord.payment_type} color="blue" name="payment_type" value="ONLINE" class="w-full p-4">ONLINE</Radio>
              </div>
            </div>      
          {/if}
        </div>        
        {#if feesRecord.payment_type=='QRCODE'}
        <div class="w-full flex justify-center border">
            <Img src="qr.jpg" width="512"></Img>
          </div> 
          <div>
            <Label class="mb-2 text-lg" for="reference_id">Transaction ID/Reference ID<span class="ml-1 text-orange-700">*</span></Label>
            <Input bind:value={feesRecord.transaction_id} type="text" id="reference_id" name="reference_id" required={feesRecord.payment_type=='QRCODE'}/>
        </div> 
        {/if}
        <div class="flex justify-end w-full py-4 mt-4 border-t rounded">
          <Button color="blue" class="w-full md:w-1/4" type="submit">
            {#if loading}
              <Spinner color="white" class="mr-4 text-lg" size={4}/> Please Wait....
            {:else}
              Submit
            {/if}
          </Button>
        </div>
    </form>  
  {/if}
{/if}

