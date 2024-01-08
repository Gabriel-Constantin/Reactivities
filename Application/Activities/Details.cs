using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            public Handler(DataContext context)
            {
                Context = context;
            }

            public DataContext Context { get; }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await Context.Activities.FindAsync(request.Id);
            }
        }
    }
}
