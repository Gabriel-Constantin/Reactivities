using AutoMapper;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IMapper mapper;

            public DataContext Context { get; }

            public Handler(DataContext context, IMapper mapper)
            {
                Context = context;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await Context.Activities.FindAsync(request.Activity.Id);

                mapper.Map(request.Activity, activity);

                await Context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
