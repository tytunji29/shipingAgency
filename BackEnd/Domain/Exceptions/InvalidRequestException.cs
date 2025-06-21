using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Exceptions
{
    public class InvalidRequestException : Exception
    {
        /// <summary>
        /// Creates an instance of <see cref="InvalidRequestException"/>.
        /// </summary>
        /// <remarks>
        /// Default message is "Record not found".
        /// </remarks>
        public InvalidRequestException() : this("Invalid request")
        {
        }

        /// <summary>
        /// Creates an instance with the specified message.
        /// </summary>
        /// <param name="message">Error message.</param>
        public InvalidRequestException(string message) : base(message)
        {
        }
    }
}
