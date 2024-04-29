using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value ="Pending")] // returns the real string value; not 0,1,2 
        Pending, //value 0 
        [EnumMember(Value ="PaymentRecevied")]
        PaymentRecevied, //value 1 
        [EnumMember(Value ="PaymentFailed")]
        PaymentFailed, // value 2

        
    }
}