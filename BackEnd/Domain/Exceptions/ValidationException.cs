using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Exceptions
{
    public class ValidationException : Exception
    {
        /// <summary>
        /// List of validation errors.
        /// </summary>
        public List<string> Errors { get; set; }

        /// <summary>
        /// Initialises a new instance of <see cref="ValidationException"/>.
        /// </summary>
        /// <param name="errors">The list of errors that occurred during validation.</param>
        /// <remarks>
        /// Has a default message of "Validation failure."
        /// </remarks>
        public ValidationException(List<string> errors) : this(errors, "Validation failure") => Errors = errors;

        /// <summary>
        /// Initialises a new instance of <see cref="ValidationException"/> with the specified error message.
        /// </summary>
        /// <param name="message">An error message.</param>
        public ValidationException(List<string> errors, string message) : base(message) => Errors = errors;
    }
}
