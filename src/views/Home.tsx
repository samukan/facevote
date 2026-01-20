import { Button } from '@/components/ui/button';
import { useStore } from '@/stores/DBStore';
import { NavLink } from 'react-router';
import { Database, RefreshCcw, Vote } from 'lucide-react';

const Home = () => {
  const { faces, votes, deleteAllFromDB } = useStore();

  const handleResetDB = () => {
    deleteAllFromDB();
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">Dashboard</div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Facevote
          </h1>
          <p className="max-w-prose text-sm text-muted-foreground">
            Manage your local face and vote data, then jump into the camera
            flow.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Faces</div>
              <div className="mt-1 text-3xl font-semibold tabular-nums">
                {faces.length}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Stored in local database
              </div>
            </div>
            <div className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
              <Database className="size-5" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Votes</div>
              <div className="mt-1 text-3xl font-semibold tabular-nums">
                {votes.length}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Captured voting events
              </div>
            </div>
            <div className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
              <Vote className="size-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Results</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Summary placeholders (logic not implemented yet).
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-muted/40 p-4">
            <div className="text-xs text-muted-foreground">Positives</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">0</div>
          </div>
          <div className="rounded-xl border bg-muted/40 p-4">
            <div className="text-xs text-muted-foreground">Negatives</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">0</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start the camera flow or clear all local data.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <NavLink to={'/face'}>Start voting</NavLink>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleResetDB}
              className="gap-2"
            >
              <RefreshCcw className="size-4" aria-hidden="true" />
              Reset database
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
