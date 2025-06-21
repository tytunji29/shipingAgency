using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Exceptions
{
    public class UnauthorisedException : Exception
    {
        /// <summary>
        /// Initialises a new instance of the <see cref="UnauthorisedException"/> with a specified error message.
        /// </summary>
        /// <param name="errorMessages">Error messages describing why the error was thrown.</param>
        public UnauthorisedException(string message) : base(message)
        {
        }

        /// <summary>
        /// Initialises a new instance of the <see cref="UnauthorisedException"/>.
        /// </summary>
        /// <remarks>
        /// Default message is "Invalid authentication credentials."
        /// </remarks>
        public UnauthorisedException() : this("Invalid authentication credentials")
        {
        }
    }
}
