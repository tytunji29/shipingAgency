using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities;

public class RegionLga
{
    public int Id { get; set; }
    public int StateId { get; set; }

    public string Name { get; set; }
}
