<script>
    import pb from '$lib/db.js'

    import { Input,Alert,Button,Radio,Spinner,Select, Label } from 'flowbite-svelte'    
    import { onMount } from 'svelte';
    let loading_dept=false,loading=false
    export let data
    let selectedRouteRecord
    let feesRecord={
      "reciept_number": 0,
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
      "amount_paid": 0.0,
      "amount_total": 0.0,
      "payment_date": new Date(),
      "payment_type":"CASH",
      "academic_year": data?.ayearList?.find(ob=>ob.is_active==true)?.id??0,
      "user": data?.profile?.id??''
    }
    let semList=[1,2,3,4,5,6,7,8,9,10],departmentList=[]
    let mesg,error_mesg
    const fetchDepartmentList=async(value)=>{
      try{
            if(value==''){
              departmentList=[]
              return
            }
            loading_dept=true
            feesRecord.amount_total=data?.routePaymentList?.find(ob=>ob.course==value).amount_total
            const query=`course='${value}'`
            departmentList = await pb.collection('department')
            .getFullList({sort: 'name',filter:query})
        }
        catch(error){
            console.log(error)        
        }
        finally{
          feesRecord.bus_point=''
          loading_dept=false
        }      
    }

    onMount(async()=>{      
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
    console.log('****',feesRecord)
  }



  const onpaid=async(ob)=>{
      console.log('****',ob)
      alert(ob.razorpay_payment_id)
      alert(ob.razorpay_order_id)
      alert(ob.razorpay_signature)
      const  rzrpy = new Razorpay({ key_id: 'rzp_test_JYdzDk5tUT2JJR', key_secret: 'xa9HFuV4XeapBYVqNE9AX3AL' })
      // var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
      // validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
  }
  const doPayment=async()=>{
        loading=true
        try{
          const response = await fetch('/api/payment', {
              method: 'POST',
              body: JSON.stringify({
                amount: feesRecord.amount_total*100,
                currency: "INR",
                receipt: "receipt1",
              }),
              headers: {
                  'content-type': 'application/json'
              }
          })
          
          alert("orederid",response.id)
          const options = {
            "key": "rzp_test_JYdzDk5tUT2JJR", 
            "amount": feesRecord.amount_total*100,
            "currency": "INR",
            "name": "SVIIT Bus Seva Application",

            "description": "Test",
            "image": "",
            "order_id": response.id,
            "prefill": { 
              "name": feesRecord.stu_name,
              "email": feesRecord.stu_email,
              "contact": feesRecord.stu_contact_number
            
            },
            "handler": function(response){
              onpaid(response)
            },
            "notes": {
                "address": "Vasad"
            },
            "theme": {
                "color": "#3399cc"
            }
      }
      const rzp1 = new Razorpay(options)
      rzp1.on('payment.failed', function (response){
        alert(response.error.description);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
    rzp1.open()
    }catch(error1){
      console.log('****',error1)      
    }
    finally{
      loading=false
    }
}
</script>
{#if data?.status=='error'}
  <Alert dismissable>{data?.error}</Alert>
{/if}
{#if error_mesg}
  <Alert dismissable>{error_mesg}</Alert>
{/if}
<div>
  
  <Button on:click={doPayment}>
    {#if loading}
          <Spinner color="white" class="mr-4 text-lg" size={4}/> Please Wait....
    {:else}
        Payment
    {/if}
  </Button>
</div>
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
    <div class="grid gap-4 mb-4 md:grid-cols-2">
      <div>        
        <Label for="enrollment_number" class="mb-2 text-lg">Enrollment/College ID/Form Number<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.enrollment_number} type="text" id="enrollment_number" name="enrollment_number" required />
      </div>
      <div>
        <Label for="enrollment_number" class="mb-2 text-lg">Student Name<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.stu_name} type="text" id="stu_name" name="stu_name" required />
      </div>
    </div>
    <div class="grid gap-4 mb-4 md:grid-cols-{2+1}">
      <div>
        <Label class="mb-2 text-lg" for="stu_email">Student Email<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.stu_email} type="email" id="stu_email" name="stu_email" required/>      
      </div>

      <div>
        <Label class="mb-2 text-lg" for="stu_contact_number">Student Contact<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.stu_contact_number} type="text" id="stu_contact_number" name="stu_contact_number" required/>
      </div>
      <div>
        <Label class="mb-2 text-lg" for="parent_contact_number">Parent Contact<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.parent_contact_number} type="text" id="parent_contact_number" name="parent_contact_number" required/>

      </div>    
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
          <div class="grid grid-cols-2 w-full md:w-1/4">




            <Radio bind:group={feesRecord.payment_type} color="blue" name="payment_type" value="CASH" class="w-full p-4">CASH</Radio>
            <Radio bind:group={feesRecord.payment_type} color="blue" name="payment_type" value="ONLINE" class="w-full p-4">ONLINE</Radio>
          </div>
        </div>      
      {/if}
    </div>

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







