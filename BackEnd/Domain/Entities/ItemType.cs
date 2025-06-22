using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class ItemType
    {
        public long Id { get; set; }
        public long ItemCategoryId { get; set; }

        public string Name { get; set; }
    }
}
