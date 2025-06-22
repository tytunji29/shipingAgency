using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Exceptions
{
    public class NotFoundException : Exception
    {
        /// <summary>
        /// Creates an instance of <see cref="NotFoundException"/>.
        /// </summary>
        /// <remarks>
        /// Default message is "Record not found".
        /// </remarks>
        public NotFoundException() : this("Record not found")
        {
        }

        /// <summary>
        /// Creates an instance with the specified message.
        /// </summary>
        /// <param name="message">Error message.</param>
        public NotFoundException(string message) : base(message)
        {
        }
    }
}
